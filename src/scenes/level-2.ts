import {Tile, Type, Board} from "../objects/board"
import{Portal} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {initSettings} from "../util/functions";
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
    public brightness: number;
    public portals: Phaser.GameObjects.Group;

    constructor() {
        super(sceneConfig);
    }

    init(data): void {
        this.data.set('playerScore', 0);
        this.data.set('playerWinningScore', 10);
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

        let i: number;
        for(i = 0; i < 5; i++) {
            //top left
            const sheep1=new SheepHorizontal({scene: this, x: Phaser.Math.Between(50, 92), y: Phaser.Math.Between(50, 78)});
            //top right
            const sheep2=new SheepVertical({scene: this, x: Phaser.Math.Between(808, 846), y: Phaser.Math.Between(50, 78)});
            //bottom right
            const sheep3=new SheepHorizontal({scene: this, x: Phaser.Math.Between(808, 840), y: Phaser.Math.Between(818, 846)});
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
    }

    update(): void {
        //update all sheep
        for(const s of this.sheep.getChildren()) {
            s.update();
        }
        // TODO
    }
}
