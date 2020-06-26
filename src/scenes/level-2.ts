import {Tile, Type, Board} from "../objects/board"
import {Portal, portalType} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {getPortalTypeWithKey, getTileTypeWithKey, initSettings} from "../util/functions";
import {Fence} from "../objects/fence";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Level2',
    physics: physicsSettings
};

export class Level2 extends Phaser.Scene {


    public sheep: Phaser.GameObjects.Group; //List of all Sheep
    public fences: Phaser.GameObjects.Group; // List of all fences
    public board: Board;
    public showGrid: boolean;
    public musicVolume: number;
    public portals: Phaser.GameObjects.Group;
    public pFunction1 = {add: 3 , multi: 2};
    public pFunction2 = {add: 5 , multi: 1};
    public pFunction3 = {add: 2 , multi: 1};
    public pFunction4 = {add: 1 , multi: 1};

    constructor() {
        super(sceneConfig);
    }

    init(data): void {
        this.data.set('playerScore', 0);
        this.data.set('playerWinningScore', 10);
        initSettings(this, data);
    }


    /*
    *passed the given functions to a different types of portals .
    *this methode depends on hwo many portal types in the level.
     */
    public assignFunctionToPortalType(portal: Portal): void{

        if(portal.ptype == portalType.gtost)  portal.setFunction(this.pFunction1.add, this.pFunction1.multi);
        if(portal.ptype == portalType.sttosa) portal.setFunction(this.pFunction2.add, this.pFunction2.multi);
        if(portal.ptype == portalType.satog) portal.setFunction(this.pFunction3.add, this.pFunction3.multi);
        if(portal.ptype == portalType.satost) portal.setFunction(this.pFunction4.add, this.pFunction4.multi);

    }

    // give back the tile with the coordinate(x,y)
    public getTile(x: number,y: number): number[] {
        const coordinates = [];
        const column = Math.floor(x / 128);
        coordinates[0]=column;
        if(this.board.tiles[column] != null) {
            const row = Math.floor(y / 128);
            coordinates[1]=row
            return coordinates;
        }
        return null
    }

    create(): void {
        this.board = new Board(7, 7, this.showGrid);

        this.board.tiles[1][1] = new Tile(Type.Stone);
        this.board.tiles[2][1] = new Tile(Type.Stone);
        this.board.tiles[3][1] = new Tile(Type.Stone);
        this.board.tiles[4][1] = new Tile(Type.Stone);
        this.board.tiles[5][1] = new Tile(Type.Stone);
        this.board.tiles[5][2] = new Tile(Type.Stone);
        this.board.tiles[5][3] = new Tile(Type.Stone);
        this.board.tiles[5][4] = new Tile(Type.Stone);
        this.board.tiles[5][5] = new Tile(Type.Stone);
        this.board.tiles[1][5] = new Tile(Type.Stone);
        this.board.tiles[2][5] = new Tile(Type.Stone);
        this.board.tiles[3][5] = new Tile(Type.Stone);
        this.board.tiles[4][5] = new Tile(Type.Stone);
        this.board.tiles[1][2] = new Tile(Type.Stone);
        this.board.tiles[1][3] = new Tile(Type.Stone);
        this.board.tiles[1][4] = new Tile(Type.Stone);

        this.board.tiles[2][2] = new Tile(Type.Sand);
        this.board.tiles[2][3] = new Tile(Type.Sand);
        this.board.tiles[2][4] = new Tile(Type.Sand);
        this.board.tiles[3][4] = new Tile(Type.Sand);
        this.board.tiles[4][4] = new Tile(Type.Sand);
        this.board.tiles[4][3] = new Tile(Type.Sand);
        this.board.tiles[4][2] = new Tile(Type.Sand);
        this.board.tiles[3][2] = new Tile(Type.Sand);

        this.board.tiles[3][3].isDestination = true;
        this.board.draw(this);
        this.sheep = this.add.group();
        this.fences = this.add.group();
        this.portals = this.physics.add.group();

        let i: number;
        for(i = 0; i < 5; i++) {
            //top left
            const sheep1=new SheepHorizontal({scene: this, x: Phaser.Math.Between(50, 92), y: Phaser.Math.Between(50, 78)});
            //top right
            const sheep2=new SheepVertical({scene: this, x: Phaser.Math.Between(808, 846), y: Phaser.Math.Between(50, 78)});
            //bottom right
            const sheep3=new SheepHorizontal({scene: this, x: Phaser.Math.Between(808, 830), y: Phaser.Math.Between(818, 846)});
            //bottom left
            const sheep4=new SheepVertical({scene: this, x: Phaser.Math.Between(50, 92), y: Phaser.Math.Between(818, 846)});
            this.sheep.addMultiple([sheep1, sheep2, sheep3, sheep4]);


            const f1 = new Fence(this, (i + 1.5) * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
            const f2 = new Fence(this, (i + 1.5) * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);
            const f3 = new Fence(this, 1 * 128, 128 * (i + 1.5), 'fence_v').setOrigin(0.5, 0.5);
            const f4 = new Fence(this, 6 * 128, 128 * (i + 1.5), 'fence_v').setOrigin(0.5, 0.5);

            if(i < 5 && i > 1) {
                const f5 = new Fence(this, (i + 0.5) * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);
                const f6 = new Fence(this, (i + 0.5) * 128, 128 * 5, 'fence_h').setOrigin(0.5, 0.5);
                const f7 = new Fence(this, 2 * 128, 128 * (i + 0.5), 'fence_v').setOrigin(0.5, 0.5);
                const f8 = new Fence(this, 5 * 128, 128 * (i + 0.5), 'fence_v').setOrigin(0.5, 0.5);
                this.fences.addMultiple([f5, f6, f7, f8]);
            }

            this.fences.addMultiple([f1, f2, f3, f4]);
        }

        this.physics.world.addCollider(this.sheep, this.sheep, (sheep1: Sheep, sheep2: Sheep) => {
            sheep1.collide(sheep2);
            sheep2.collide(sheep1);
        })

        this.physics.world.addCollider(this.fences, this.sheep, (fences: Fence, sheep: Sheep) => {
            sheep.collide(fences);
        })

        this.physics.world.addCollider(this.portals, this.sheep, (sheep: Sheep, portal: Portal) => {
            portal.executeTeleport(this, this.board,this.portals, sheep);
        })


        this.scene.get('teleportGUI').data.events.on('changedata-placingTeleporter', (scene, value) => {
            const placingTeleporter = scene.data.get('placingTeleporter');
            if (placingTeleporter) {
                this.input.on("pointerdown",(pointer: Phaser.Input.Pointer)=>{
                    const coordinates = this.getTile(pointer.x, pointer.y);
                    const tile = this.board.tiles[coordinates[0]][coordinates[1]];
                    if ((placingTeleporter.startsWith('grass') && tile.type != Type.Grass) ||
                        (placingTeleporter.startsWith('stone') && tile.type != Type.Stone) ||
                        (placingTeleporter.startsWith('sand') && tile.type != Type.Sand)) {
                        const notAllowed = this.add.image(coordinates[0]* 128 + 64, coordinates[1]* 128 + 64,'notAllowed');
                        notAllowed.setDisplaySize(50, 50);
                        setTimeout(() => {
                            notAllowed.destroy();
                        }, 1500);
                    } else {

                        const portalType = getPortalTypeWithKey(placingTeleporter);
                        tile.portal = new Portal( this,coordinates[0]* 128 + 64,coordinates[1]* 128 + 64, placingTeleporter, portalType);
                        tile.portal.createAnim(this);

                        this.assignFunctionToPortalType(tile.portal);
                        const goal = tile.portal.whereToGo(this.board, tile.tileNumber,tile.type);
                        const tileType = getTileTypeWithKey(placingTeleporter);
                        tile.portal.setGoal(this.board.findTile(tileType, goal));
                        this.portals.add(tile.portal);
                        this.input.off('pointerdown');
                    }
                });
            }
        });

        this.scene.get('teleportGUI').data.events.on('changedata-teleportersActivated', (scene, value) => {
            const teleportersActivated = scene.data.get('teleportersActivated');
            if (teleportersActivated) {
                this.portals.children.each((portal: Portal) =>{
                    portal.chosen = true;
                    portal.setTexture("portal");
                    portal.setSize(128,128);
                    portal.play("Portal2",true);
                    portal.on("animationcomplete", ()=>{
                        portal.chosen = false ;
                        portal.destroy();
                    })

                })
            }
        });


    }

    update(): void {
        //update all sheep
        for(const s of this.sheep.getChildren()) {
            s.update();
        }
        // TODO
    }
}
