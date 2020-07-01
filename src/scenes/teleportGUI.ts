import {MappingNumbers} from "../util/functions";

export class TeleportGUIScene extends Phaser.Scene {

    public teleporters: string[];
    public grassToStone: any;
    public stoneToSand: any;
    public sandToGrass: any;
    public keyboard: {[index: string]: Phaser.Input.Keyboard.Key};
    public counter: number;
    public teleporterCounter: number;

    constructor() {
        super({
            key: "teleportGUI",
            active: false
        });
    }

    init(data): void {
        this.data.set('teleportersActivated', false);
        this.data.set('placingTeleporter', null);
        this.data.set('removeTeleporter', null);
        this.teleporters = data.teleporters;
        this.teleporterCounter = 0;
        this.data.set('teleportersCounter', this.teleporterCounter);
    }

    create() {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;

        const teleportersButton = this.add.image(width - 100, 125, 'teleporters');
        let yCoordinateTeleport = 200;
        this.counter= 1;
        for (const teleporter of this.teleporters)  {
           this[teleporter] = this.add.image(width - 100, yCoordinateTeleport, teleporter);
           yCoordinateTeleport += 75;
           this[teleporter].setDisplaySize(0.04 * width, 0.08 * height);
           this[teleporter].visible = false;
           this[teleporter].setInteractive(({ useHandCursor: true }));
           this[teleporter].on('pointerdown', () => {
               this.data.set('placingTeleporter', teleporter);
           });

           const keyObject = this.input.keyboard.addKey(MappingNumbers(this.counter));
           keyObject.on('down' , () => {
               this.data.set('placingTeleporter', teleporter);
           })
            this.counter = this.counter + 1;

        }
        const powerOn = this.add.image(width - 100, yCoordinateTeleport, 'powerOn');
        const teleporterCounterText = this.add.text(width - 250, yCoordinateTeleport + 75,
            "You have used teleporters \n" + this.teleporterCounter + " times.");
        teleportersButton.setDisplaySize(0.04 * width, 0.08 * height);
        teleportersButton.setInteractive(({ useHandCursor: true }));

        let teleportersVisible = false;
        teleporterCounterText.visible = false;
        powerOn.visible = false;
        teleportersButton.on('pointerdown', () => {
            if (teleportersVisible){
                this.grassToStone.visible = false;
                this.stoneToSand.visible = false;
                this.sandToGrass.visible = false;
                powerOn.visible = false;
                teleporterCounterText.visible = false;
            } else {
                this.grassToStone.visible = true;
                this.stoneToSand.visible = true;
                this.sandToGrass.visible = true;
                powerOn.visible = true;
                teleporterCounterText.visible = true;
            }
            teleportersVisible = !teleportersVisible;
        });

        powerOn.setDisplaySize(0.03 * width, 0.06 * height);
        powerOn.setInteractive(({ useHandCursor: true }));
        powerOn.on('pointerdown', () => {
            this.teleporterCounter++;
            this.data.set('teleportersCounter', this.teleporterCounter);
            if (this.teleporterCounter == 1) {
                teleporterCounterText.setText("You have used teleporters \n1 time.");
            } else {
                teleporterCounterText.setText("You have used teleporters \n" + this.teleporterCounter + " times.");
            }
            this.data.set('teleportersActivated', true);
            setTimeout(() => {
                this.data.set('teleportersActivated', false);
            }, 1000);
        });

        const keyObject2 = this.input.keyboard.addKey("ENTER");
        keyObject2.on('down' , () => {
            teleporterCounter--;
            teleporterCounterText.setText("You can activate teleporter \n" + teleporterCounter + " more times.");
            this.data.set('teleportersActivated', true);
            if (teleporterCounter == 0) {
                powerOn.disableInteractive();
                teleporterCounterText.setText("You can't activate teleporter \n anymore.");
            }
            setTimeout(() => {
                this.data.set('teleportersActivated', false);
            }, 1000);
        })

        const keyObject3 = this.input.keyboard.addKey("BACKSPACE");
        keyObject3.on('down', () => {

            this.data.set('placingTeleporter', false);
        })

    }
}