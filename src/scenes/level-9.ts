import {Tile, Type, Board} from "../objects/board"
import{Portal} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {initSettings} from "../util/functions";
import {Fence} from "../objects/fence";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Level9',
    physics: physicsSettings
};

export class Level9 extends Phaser.Scene {


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
        this.data.set('playerWinningScore', 5); //doesn't work
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

        for (let y = 0; y < 3; y++) {
            const x = (y + 2) % 3;
            this.board.tiles[x][y] = new Tile(Type.Stone);
            this.board.tiles[x + 3][y] = new Tile(Type.Stone);
            this.board.tiles[x][y + 3] = new Tile(Type.Stone);
            this.board.tiles[x + 3][y + 3] = new Tile(Type.Stone);
        }
        for (let x = 0; x < 3; x++) {
            this.board.tiles[x][x] = new Tile(Type.Sand);
            this.board.tiles[x + 3][x] = new Tile(Type.Sand);
            this.board.tiles[x][x + 3] = new Tile(Type.Sand);
            this.board.tiles[x + 3][x + 3] = new Tile(Type.Sand);
        }

        this.board.tiles[0][5].isDestination = true;
        this.board.draw(this);
        this.sheep = this.add.group();
        this.fences = this.add.group();

        // const sheep1 = new SheepHorizontal({scene: this, x: Phaser.Math.Between(50, 92), y: Phaser.Math.Between(0 * 128 + 50, 0 * 128 + 78)});
        const sheep1 = new SheepVertical({scene: this, x: Phaser.Math.Between(0 * 128 + 50, 0 * 128 + 78), y: Phaser.Math.Between(0 * 128 + 50, 0 * 128 + 78)});
        const sheep2 = new SheepVertical({scene: this, x: Phaser.Math.Between(0 * 128 + 50, 0 * 128 + 78), y: Phaser.Math.Between(0 * 128 + 50, 0 * 128 + 78)});
        const sheep3 = new SheepVertical({scene: this, x: Phaser.Math.Between(5 * 128 + 50, 5 * 128 + 78), y: Phaser.Math.Between(5 * 128 + 50, 5 * 128 + 78)});
        const sheep4 = new SheepVertical({scene: this, x: Phaser.Math.Between(5 * 128 + 50, 5 * 128 + 78), y: Phaser.Math.Between(5 * 128 + 50, 5 * 128 + 78)});
        const sheep5 = new SheepVertical({scene: this, x: Phaser.Math.Between(5 * 128 + 50, 5 * 128 + 78), y: Phaser.Math.Between(5 * 128 + 50, 5 * 128 + 78)});
        this.sheep.addMultiple([sheep1, sheep2, sheep3, sheep4, sheep5]);


        const f1 = new Fence(this, 1 * 128, 128 * 5.5, 'fence_v').setOrigin(0.5, 0.5);
        const fh1 = new Fence(this, 0.5 * 128, 128 * 5, 'fence_h').setOrigin(0.5, 0.5);
        this.fences.addMultiple([f1, fh1]);

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
