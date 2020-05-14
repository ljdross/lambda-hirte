import 'phaser';
import {Board, Tile} from "./board";

export abstract class Sheep extends Phaser.Physics.Arcade.Sprite {
    protected speed: number;
    protected goal: boolean;

    protected constructor(protected config, sprite) {
        super(config.scene, config.x, config.y, sprite, 0);
        config.scene.add.existing(this);
        this.speed = Phaser.Math.Between(30 , 100) / 100;
        this.goal = false;
    }

    //needs to be called in scene for each sheep
    update(...args): void {
        super.update(...args);
        this.move();
        this.atBorder();
        this.onGoal(this.config.scene.board);
    }

    abstract move(): void;

    abstract atBorder(): void;

    public onGoal(board: Board): void {
        // TODO check if on Goal or make public
        if(this.getTile(board) != null) {
            if(this.getTile(board).isDestination) {
                this.goal = true;
                this.anims.pause();
            } else {
                this.goal = false;
                this.anims.resume();
            }
        }

    }

    public getTile(board: Board): Tile {
        const column = Math.floor(this.x / 128);
        if(board.tiles[column] != null) {
            const row = Math.floor(this.y / 128);
            return board.tiles[column][row];
        }
        return null
    }

    abstract obstacle(): void;

}

export class SheepVertical extends Sheep {
    constructor(config) {
        super(config, 'sheep_v');
        this.scene.anims.create({
            key: 'walk_down',
            frames: this.scene.anims.generateFrameNumbers('sheep_v', {start: 0, end: 7}),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'walk_up',
            frames: this.scene.anims.generateFrameNumbers('sheep_v', {start: 8, end: 11}),
            frameRate: 10,
            repeat: -1,
        });
    }

    move(): void {
        if(this.goal == false) {
            if(this.speed < 0) this.play('walk_up', true);
            else this.play('walk_down', true);
            this.y += this.speed;
        }
    }

    atBorder(): void {
        if((this.speed < 0 && this.y <= 0) || (this.speed > 0 && this.y >= this.scene.sys.game.canvas.height)) {
            this.obstacle();
        }
    }

    obstacle() {
        this.speed *= (-1);
    }
}

export class SheepHorizontal extends Sheep {
    constructor(config) {
        super(config, 'sheep_h');
        this.scene.anims.create({
            key: 'walk_horizontal',
            frames: this.scene.anims.generateFrameNumbers('sheep_h', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1,
        });
    }

    move(): void {
        if(this.goal == false) {
            this.play('walk_horizontal', true);
            this.x += this.speed;
        }
    }

    atBorder(): void {
        if((this.speed < 0 && this.x <= 0) || (this.speed > 0 && this.x >= this.scene.sys.game.canvas.width)) {
            this.obstacle();
        }
    }

    obstacle() {
        this.speed *= (-1);
        this.scaleX *= (-1);
    }
}