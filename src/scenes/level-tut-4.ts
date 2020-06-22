import {Tile, Type, Board} from "../objects/board"
import{Portal} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {initSettings} from "../util/functions";
import {Fence} from "../objects/fence";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'LevelTut4',
    physics: physicsSettings
};

export class LevelTut4 extends Phaser.Scene {


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
        this.data.set('playerWinningScore', 1); //doesn't work
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
        this.board = new Board(8, 6, this.showGrid);

        for (let x = 4; x < 8; x++) {
            for (let y = 0; y < 3; y++) {
                this.board.tiles[x][y] = new Tile(Type.Stone);
            }
        }
        for (let x = 4; x < 8; x++) {
            for (let y = 3; y < 6; y++) {
                this.board.tiles[x][y] = new Tile(Type.Sand);
            }
        }

        this.board.tiles[0][5].isDestination = true;
        this.board.draw(this);
        this.sheep = this.add.group();
        this.fences = this.add.group();

        const sheep1 = new SheepHorizontal({scene: this, x: Phaser.Math.Between(50, 92), y: Phaser.Math.Between(50, 78)});
        const sheep2 = new SheepVertical({scene: this, x: Phaser.Math.Between(434, 462), y: Phaser.Math.Between(50, 78)});
        this.sheep.addMultiple([sheep1, sheep2]);


        const fh1 = new Fence(this, 0.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const fh2 = new Fence(this, 1.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const fh3 = new Fence(this, 2.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const fh4 = new Fence(this, 3.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const fh5 = new Fence(this, 4.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const fh6 = new Fence(this, 5.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const fh7 = new Fence(this, 6.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const fh8 = new Fence(this, 7.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const f1 = new Fence(this, 4 * 128, 128 * 0.5, 'fence_v').setOrigin(0.5, 0.5);
        const f2 = new Fence(this, 4 * 128, 128 * 1.5, 'fence_v').setOrigin(0.5, 0.5);
        const f3 = new Fence(this, 4 * 128, 128 * 2.5, 'fence_v').setOrigin(0.5, 0.5);
        const f4 = new Fence(this, 4 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const f5 = new Fence(this, 4 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);
        const f6 = new Fence(this, 4 * 128, 128 * 5.5, 'fence_v').setOrigin(0.5, 0.5);
        this.fences.addMultiple([fh1, fh2, fh3, fh4, fh5, fh6, fh7, fh8, f1, f2, f3, f4, f5, f6]);

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
