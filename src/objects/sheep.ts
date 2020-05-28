import 'phaser';
import {Tile, Type} from "../objects/board";
import GameObject = Phaser.GameObjects.GameObject;

export abstract class Sheep extends Phaser.Physics.Arcade.Sprite {
    public speed: number;
    protected sandSpeed: number;
    protected goal: boolean;
    protected eating: boolean;
    protected cooldown: number;

    protected constructor(protected config, sprite, speed?: number) {
        super(config.scene, config.x, config.y, sprite, 0);
        config.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        if (speed) this.speed = speed;
        else this.speed = Phaser.Math.Between(40, 100) / 100;
        this.sandSpeed = this.speed - (this.speed / 3);
        this.goal = false;
        this.eating = false;
        this.cooldown = 20;
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

    abstract eatAnim(): void;

    //1 up, 2 left, 3 down, 4 right
    abstract front(): number;

    public onGoal(): void {
        const tileX = Math.floor(this.x / 64);
        if(this.getTile()) {
            if(this.getTile().isDestination && tileX % 2 == 1) {
                this.goal = true;
                this.anims.pause();
                this.visible = false;
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

    protected onGrass(): boolean {
        return this.getTile() && this.getTile().type == Type.Grass;
    }

    protected eatGrass(): void {
        if(this.onGrass() && Phaser.Math.Between(0, 300) == 7 && this.front() != 1) {
            this.eating = !this.eating;
            this.cooldown = 20;
        }
    }

    protected walk(): void {
        if (this.cooldown == 0) this.eatGrass();
        else this.cooldown -= 1;
        if (this.eating) this.eatAnim();
        else if(!this.goal) {
            if(this.onSand()) this.move(this.sandSpeed);
            else this.move(this.speed);
        }
    }

    public collide(obj: Phaser.GameObjects.Sprite): void {
        if((this.front() == 1 && this.y > obj.y) || (this.front() == 2 && this.x < obj.x)
            || (this.front() == 3 && this.y < obj.y) || (this.front() == 4 && this.x > obj.x)) {
            this.obstacle();
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
        this.scene.anims.create({
            key: 'eat_v',
            frames: this.scene.anims.generateFrameNumbers('sheep_v', {start: 12, end: 24}),
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

    eatAnim(): void {
        this.anims.play('eat_v', true);
    }

    front(): number {
        if(this.speed < 0) return 1;
        return 3;
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
        this.scene.anims.create({
            key: 'eat_h',
            frames: this.scene.anims.generateFrameNumbers('sheep_h', {start: 4, end: 17}),
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

    eatAnim(): void {
        this.anims.play('eat_h', true);
    }

    front(): number {
        if(this.speed < 0) return 4;
        return 2;
    }
}