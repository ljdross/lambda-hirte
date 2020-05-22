import 'phaser';
import {Tile, Type} from "../objects/board";

export abstract class Sheep extends Phaser.Physics.Arcade.Sprite {
    protected speed: number;
    protected sandSpeed: number;
    protected goal: boolean;

    protected constructor(protected config, sprite, speed?: number) {
        super(config.scene, config.x, config.y, sprite, 0);
        config.scene.add.existing(this);
<<<<<<< HEAD
        this.scene.physics.add.existing(this);
        this.speed = Phaser.Math.Between(40 , 100) / 100;
=======
        if (speed) this.speed = speed;
        else this.speed = Phaser.Math.Between(40 , 100) / 100;
>>>>>>> b62a59d151dbea73cbefdccb2815e7fdfc698508
        this.goal = false;
        this.sandSpeed = this.speed - (this.speed / 3);
    }

    //needs to be called in scene for each sheep
    update(...args): void {
        super.update(...args);
        this.walk();
        this.atBorder();
        this.onGoal();
        this.onSand();
    }

    abstract move(speed: number): void;

    abstract atBorder(): void;

    abstract obstacle(): void;

    public onGoal(): void {
        if(this.getTile()) {
            if(this.getTile().isDestination) {
                this.goal = true;
                this.anims.pause();
            } else {
                this.goal = false;
                this.anims.resume();
            }
        }
    }

    public getTile(): Tile {
        const board = this.config.scene.board;
        const column = Math.floor(this.x / 128);
        if(board.tiles[column]) {
            const row = Math.floor(this.y / 128);
            return board.tiles[column][row];
        }
        return null
    }

    protected onSand(): boolean {
        return this.getTile() && this.getTile().type == Type.Sand;
    }

    protected walk(): void {
        if(this.goal == false) {
            if(this.onSand()) this.move(this.sandSpeed);
            else this.move(this.speed);
        }
    }

}

export class SheepVertical extends Sheep {
    constructor(config, speed?: number) {
        super(config, 'sheep_v', speed);
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

    move(speed: number): void {
        if(speed < 0) this.play('walk_up', true);
        else this.play('walk_down', true);
        this.y += speed;
    }

    atBorder(): void {
        if((this.speed < 0 && this.y <= 0) || (this.speed > 0 && this.y >= this.scene.sys.game.canvas.height)) {
            this.obstacle();

        }
    }

    obstacle(): void {
        this.speed *= (-1);
        this.sandSpeed *= (-1);
    }
}

export class SheepHorizontal extends Sheep {
    constructor(config, speed?: number) {
        super(config, 'sheep_h', speed);
        this.scene.anims.create({
            key: 'walk_horizontal',
            frames: this.scene.anims.generateFrameNumbers('sheep_h', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1,
        });
    }

    move(speed: number): void {
        this.play('walk_horizontal', true);
        this.x += speed;
    }

    atBorder(): void {
        if((this.speed < 0 && this.x <= 0) ) {
            this.obstacle();
            this.setOffset(0,0);
        }
        if((this.speed > 0 && this.x >= this.scene.sys.game.canvas.width)){
            this.obstacle();
            this.setOffset(100,0);
        }
    }

    obstacle(): void {
        this.speed *= (-1);
        this.scaleX *= (-1);
        this.sandSpeed *= (-1);
    }
}