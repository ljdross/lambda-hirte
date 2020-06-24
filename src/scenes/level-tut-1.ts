import {Tile, Type, Board} from "../objects/board"
import{Portal} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {initSettings} from "../util/functions";
import {Fence} from "../objects/fence";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'LevelTut1',
    physics: physicsSettings
};

export class LevelTut1 extends Phaser.Scene {


    public sheep: Phaser.GameObjects.Group; //List of all Sheep
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
        this.board = new Board(7, 7, this.showGrid);

        this.board.tiles[6][5].isDestination = true;
        this.board.draw(this);
        this.sheep = this.add.group();


        const sheep1 = new SheepHorizontal({scene: this, x: Phaser.Math.Between(50, 92), y: Phaser.Math.Between(50, 78)});
        this.sheep.addMultiple([sheep1]);

        this.physics.world.addCollider(this.sheep, this.sheep, (sheep1: Sheep, sheep2: Sheep) => {
            sheep1.collide(sheep2);
            sheep2.collide(sheep1);
        })
    }

    update(): void {
        //update all sheep
        for(const s of this.sheep.getChildren()) {
            s.update();
        }
    }
}
