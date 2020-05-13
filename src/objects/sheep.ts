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
        this.setInteractive();
        this.scale = 0.5;
    }

    //needs to be called in scene for each sheep
    update(...args): void {
        super.update(...args);
        this.move();
        this.obstacle();
    }

    abstract move(): void;

    //changes Direction at Border or if scene.data.get('collision') = 1;
    abstract obstacle(): void;

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

    protected collision(): boolean {
        return this.scene.data.get('collision') == 1;
    }
}

export class SheepVertical extends Sheep {
    constructor(config) {
        super(config, 'sheep_v');
        this.config.scene.anims.create({
            key: 'walk_vertical',
            frames: this.config.scene.anims.generateFrameNumbers('sheep_v', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1,
        });
    }

    move(): void {
        if(this.goal == false) {
            this.play('walk_vertical', true);
            this.y += this.speed;
        }
    }

    obstacle(): void {
        if((this.speed < 0 && this.y <= 0) || (this.speed > 0 && this.y >= this.config.scene.sys.game.canvas.height)
            || this.collision()) {
            this.speed *= (-1);
            this.scaleY *= (-1);
        }
    }
}

export class SheepHorizontal extends Sheep {
    constructor(config) {
        super(config, 'sheep_h');
        this.config.scene.anims.create({
            key: 'walk_horizontal',
            frames: this.config.scene.anims.generateFrameNumbers('sheep_h', {start: 0, end: 3}),
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

    obstacle(): void {
        if((this.speed < 0 && this.x <= 0) || (this.speed > 0 && this.x >= this.config.scene.sys.game.canvas.width)
            || this.collision()) {
            this.speed *= (-1);
            this.scaleX *= (-1);
        }
    }
}