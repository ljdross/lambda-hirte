import {Tile, Type, Board} from "../objects/board"
import{Portal} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {initSettings} from "../util/functions";
import {Fence} from "../objects/fence";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Level8',
    physics: physicsSettings
};

export class Level8 extends Phaser.Scene {


    public sheep: Phaser.GameObjects.Group; //List of all Sheep
    public fences: Phaser.GameObjects.Group; // List of all fences
    public board: Board;
    public showGrid: boolean;
    public musicVolume: number;
    public brightness: number;
    public portals: Phaser.GameObjects.Group;

    constructor() {
        super(sceneConfig);
    }

    init(data): void {
        this.data.set('playerScore', 0);
        this.data.set('playerWinningScore', 3); //doesn't work
        initSettings(this, data);
    }

    // give back the tile with the coordinate(x,y)
    public getTile(x: number,y: number): Tile {
        const column = Math.floor(x / 128);
        if(this.board.tiles[column] != null) {
            const row = Math.floor(y / 128);
            return this.board.tiles[column][row];
        }
        return null
    }

    create(): void {
        this.board = new Board(6, 6, this.showGrid);

        for (let x = 1; x < 6; x += 2) {
            for (let y = 0; y < 6; y += 2) {
                this.board.tiles[x][y] = new Tile(Type.Stone);
            }
        }
        for (let x = 0; x < 6; x += 2) {
            for (let y = 1; y < 6; y += 2) {
                this.board.tiles[x][y] = new Tile(Type.Stone);
            }
        }

        this.board.tiles[3][3].isDestination = true;
        this.board.draw(this);
        this.sheep = this.add.group();
        this.fences = this.add.group();

        const sheep1 = new SheepHorizontal({scene: this, x: Phaser.Math.Between(50, 92), y: Phaser.Math.Between(4 * 128 + 50, 4 * 128 + 78)});
        const sheep2 = new SheepHorizontal({scene: this, x: Phaser.Math.Between(50, 92), y: Phaser.Math.Between(4 * 128 + 50, 4 * 128 + 78)});
        const sheep3 = new SheepHorizontal({scene: this, x: Phaser.Math.Between(50, 92), y: Phaser.Math.Between(4 * 128 + 50, 4 * 128 + 78)});
        this.sheep.addMultiple([sheep1, sheep2, sheep3]);


        const f1 = new Fence(this, 3 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const f2 = new Fence(this, 4 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fh1 = new Fence(this, 3.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const fh2 = new Fence(this, 3.5 * 128, 128 * 4, 'fence_h').setOrigin(0.5, 0.5);
        this.fences.addMultiple([f1, f2, fh1, fh2]);

        this.physics.world.addCollider(this.sheep, this.sheep, (sheep1: Sheep, sheep2: Sheep) => {
            sheep1.collide(sheep2);
            sheep2.collide(sheep1);
        })

        this.physics.world.addCollider(this.fences, this.sheep, (fences: Fence, sheep: Sheep) => {
            sheep.collide(fences);
        })
    }

    update(): void {
        //update all sheep
        for(const s of this.sheep.getChildren()) {
            s.update();
        }
    }
}
