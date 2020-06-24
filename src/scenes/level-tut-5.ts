import {Tile, Type, Board} from "../objects/board"
import{Portal} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {initSettings} from "../util/functions";
import {Fence} from "../objects/fence";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'LevelTut5',
    physics: physicsSettings
};

export class LevelTut5 extends Phaser.Scene {


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
        this.board = new Board(8, 8, this.showGrid);

        // creating sand tiles
        for (let x = 0; x < 8; x++) {
            this.board.tiles[x][3] = new Tile(Type.Sand);
        }
        for (let y = 0; y < 8; y++) {
            this.board.tiles[4][y] = new Tile(Type.Sand);
        }

        // creating stone tiles
        for (let x = 0; x < 8; x++) {
            this.board.tiles[x][7 - x] = new Tile(Type.Stone);
        }
        this.board.tiles[0][0] = new Tile(Type.Stone);
        this.board.tiles[1][1] = new Tile(Type.Stone);
        this.board.tiles[2][2] = new Tile(Type.Stone);

        this.board.tiles[5][4] = new Tile(Type.Stone);
        this.board.tiles[6][5] = new Tile(Type.Stone);
        this.board.tiles[7][6] = new Tile(Type.Stone);

        // creating grass tile for destination
        this.board.tiles[4][3] = new Tile(Type.Grass);

        this.board.tiles[4][3].isDestination = true;
        this.board.draw(this);
        this.sheep = this.add.group();
        this.fences = this.add.group();

        const sheep1 = new SheepHorizontal({scene: this, x: Phaser.Math.Between(7 * 128 + 50, 7 * 128 + 92), y: Phaser.Math.Between(7 * 128 + 50, 7 * 128 + 78)});
        this.sheep.addMultiple([sheep1]);

        // creating fences
        const fh11 = new Fence(this, 1.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
        const fh12 = new Fence(this, 2.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
        const fh13 = new Fence(this, 3.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
        const fh14 = new Fence(this, 4.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
        const fh15 = new Fence(this, 5.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
        const fh16 = new Fence(this, 6.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);

        const fh21 = new Fence(this, 2.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);
        const fh22 = new Fence(this, 3.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);
        const fh23 = new Fence(this, 4.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);
        const fh24 = new Fence(this, 5.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);

        const fh31 = new Fence(this, 3.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const fh32 = new Fence(this, 4.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);

        const fh41 = new Fence(this, 3.5 * 128, 128 * 5, 'fence_h').setOrigin(0.5, 0.5);
        const fh42 = new Fence(this, 4.5 * 128, 128 * 5, 'fence_h').setOrigin(0.5, 0.5);
        const fh43 = new Fence(this, 5.5 * 128, 128 * 5, 'fence_h').setOrigin(0.5, 0.5);

        const fh51 = new Fence(this, 2.5 * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);
        const fh52 = new Fence(this, 3.5 * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);
        const fh53 = new Fence(this, 4.5 * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);
        const fh54 = new Fence(this, 5.5 * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);
        const fh55 = new Fence(this, 6.5 * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);

        const fh61 = new Fence(this, 1.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh62 = new Fence(this, 2.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh63 = new Fence(this, 3.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh64 = new Fence(this, 4.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh65 = new Fence(this, 5.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh66 = new Fence(this, 6.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh67 = new Fence(this, 7.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);

        const fv11 = new Fence(this, 1 * 128, 128 * 1.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv12 = new Fence(this, 1 * 128, 128 * 2.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv13 = new Fence(this, 1 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv14 = new Fence(this, 1 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv15 = new Fence(this, 1 * 128, 128 * 5.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv16 = new Fence(this, 1 * 128, 128 * 6.5, 'fence_v').setOrigin(0.5, 0.5);

        const fv21 = new Fence(this, 2 * 128, 128 * 2.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv22 = new Fence(this, 2 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv23 = new Fence(this, 2 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv24 = new Fence(this, 2 * 128, 128 * 5.5, 'fence_v').setOrigin(0.5, 0.5);

        const fv31 = new Fence(this, 3 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv32 = new Fence(this, 3 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);

        const fv41 = new Fence(this, 5 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);

        const fv51 = new Fence(this, 6 * 128, 128 * 2.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv52 = new Fence(this, 6 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv53 = new Fence(this, 6 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);

        const fv61 = new Fence(this, 7 * 128, 128 * 1.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv62 = new Fence(this, 7 * 128, 128 * 2.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv63 = new Fence(this, 7 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv64 = new Fence(this, 7 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv65 = new Fence(this, 7 * 128, 128 * 5.5, 'fence_v').setOrigin(0.5, 0.5);

        this.fences.addMultiple([fh11,fh12,fh13,fh14,fh15,fh16,fh21,fh22,fh23,fh24,fh31,fh32,fh41,fh42,fh43,fh51,fh52,fh53,fh54,fh55,fh61,fh62,fh63,fh64,fh65,fh66,fh67]);
        this.fences.addMultiple([fv11,fv12,fv13,fv14,fv15,fv16,fv21,fv22,fv23,fv24,fv31,fv32,fv41,fv51,fv52,fv53,fv61,fv62,fv63,fv64,fv65]);

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
