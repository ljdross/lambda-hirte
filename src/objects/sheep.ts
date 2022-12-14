import 'phaser';
import {Tile, Type} from "./tile";
import {Portal} from "./teleport";


export abstract class Sheep extends Phaser.Physics.Arcade.Sprite {

    public speed: number;
    public collision: boolean;
    protected sandSpeed: number;
    protected goal: boolean;
    protected eating: boolean;
    protected cooldown: number;
    protected eatTimer: number;
    public stopped: boolean;

    protected constructor(protected config, sprite, speed?: number, collision?: boolean) {
        super(config.scene, config.x, config.y, sprite, 0);
        config.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        if(collision) this.collision = collision;
        else this.collision = false;
        if (speed) this.speed = speed;
        else this.speed = Phaser.Math.Between(40, 100) / 100;
        this.sandSpeed = this.speed - (this.speed / 3);
        this.goal = false;
        this.eating = false;
        this.eatTimer = 0;
        this.cooldown = 20;
        this.setSize(60, 10);
        this.setOffset(17, 85);
        this.body.debugShowBody = false;
        this.setData('saved', false);
        this.stopped = false;
    }

    //needs to be updated in scene for each sheep
    update(...args): void {
        super.update(...args);
        if(this.y >= 0) this.depth = this.y;
        else this.depth = 0;
        this.atBorder();
        this.onGoal();
        this.onSand();
        this.walk();
    }

    //1 up, 2 left, 3 down, 4 right
    abstract front(): number;
    abstract move(speed: number): void;
    abstract isAtBorder(): boolean;
    abstract obstacle(): void;
    abstract eatAnim(): void;

    public onGoal(): void {
        const tileX = Math.floor(this.x / 64);
        if(this.getCenterTile() && this.getCenterTile().isDestination && tileX % 2 == 1) {
            this.goal = true;
            this.anims.pause();
            this.visible = false;
            this.setData('saved', true);
            this.destroy();
        }
    }

    public getTile(x: number, y: number): Tile {
        const board = this.config.scene.board;
        const column = Math.floor(x / 128);
        if (board.tiles[column]) {
            const row = Math.floor(y / 128);
            return board.tiles[column][row];
        }
        return null;
    }

    protected getFrontTile(): Tile {
        return this.getTile(this.getFrontX(), this.getFrontY());
    }

    protected getHeadTile(): Tile {
        if(this.front() == 2 || this.front() == 4) return this.getTile(this.getFrontX() - 10, this.getFrontY());
        else return this.getFrontTile()
    }

    protected getCenterTile(): Tile {
        return this.getTile(this.x, this.y);
    }

    protected getFrontX(): number {
        if(this.front() == 2) return this.x + 50;
        if(this.front() == 4) return this.x - 50;
        return this.x;
    }

    protected getFrontY(): number {
        if(this.front() == 1) return this.y - 30;
        if(this.front() == 3) return this.y + 50;
        return this.y + 50;
    }

    protected onSand(): boolean {
        return this.getFrontTile() && this.getFrontTile().type == Type.Sand;
    }

    protected onGrass(): boolean {
        return this.getHeadTile() && this.getHeadTile().type == Type.Grass;
    }

    protected eatGrass(): void {
        if(this.onGrass() && Phaser.Math.Between(0, 300) == 7 && this.front() != 1) {
            this.eating = !this.eating;
            this.cooldown = 20;
        }
    }

    protected walk(): void {
        if(this.eating) this.eatTimer++;
        else this.eatTimer = 0;

        if(this.eatTimer > 400) this.eating = false;
        if(this.eating && !this.onGrass()) this.eating = false;

        if(this.cooldown == 0) this.eatGrass();
        else this.cooldown -= 1;

        if(this.eating) this.eatAnim();
        else if(!this.goal && !this.stopped) {
            if (this.onSand()) this.move(this.sandSpeed);
            else this.move(this.speed);
        }
    }

    public collide(obj: Phaser.Physics.Arcade.Sprite): void {
        if(obj instanceof Portal) {
            this.stopped = true;
            this.anims.pause();
        } else if(!(obj instanceof Sheep) || (this.collision && !(obj.x == this.x && obj.y == this.y))) {
            if ((this.front() == 1 && this.body.y > obj.body.y) || (this.front() == 2 && this.x < obj.x)
                || (this.front() == 3 && this.body.y < obj.body.y) || (this.front() == 4 && this.x > obj.x)) {
                this.obstacle();
            }
        }
    }

    protected atBorder(): void {
        if(this.isAtBorder()) {
            this.obstacle();
        }
    }
}

export class SheepVertical extends Sheep {
    constructor(config, speed?: number, collision?: boolean) {
        super(config, 'sheep_v', speed, collision);
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
            key: 'eat_down',
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

    isAtBorder(): boolean {
        return (this.speed < 0 && this.getFrontY() <= 0) || (this.speed > 0 && this.getFrontY() >= this.scene.sys.game.canvas.height)
            || !this.getFrontTile();

    }

    obstacle(): void {
        this.speed *= (-1);
        this.sandSpeed *= (-1);
    }

    eatAnim(): void {
        this.anims.play('eat_down', true);
    }

    front(): number {
        if(this.speed < 0) return 1;
        return 3;
    }
}

export class SheepHorizontal extends Sheep {
    constructor(config, speed?: number, collision?: boolean) {
        super(config, 'sheep_h', speed, collision);
        this.scene.anims.create({
            key: 'walk_right',
            frames: this.scene.anims.generateFrameNumbers('sheep_h', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'eat_right',
            frames: this.scene.anims.generateFrameNumbers('sheep_h', {start: 4, end: 17}),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'walk_left',
            frames: this.scene.anims.generateFrameNumbers('sheep_h', {start: 18, end: 21}),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'eat_left',
            frames: this.scene.anims.generateFrameNumbers('sheep_h', {start: 22, end: 35}),
            frameRate: 10,
            repeat: -1,
        });
    }

    move(speed: number): void {
        if(speed < 0) this.play('walk_left', true);
        else this.play('walk_right', true);
        this.x += speed;
    }

    isAtBorder(): boolean {
        return (this.speed < 0 && this.getFrontX() <= 0) || (this.speed > 0 && this.getFrontX() >= this.scene.sys.game.canvas.width)
            || !this.getFrontTile() || !this.getCenterTile();

    }

    obstacle(): void {
        this.speed *= (-1);
        this.sandSpeed *= (-1);
    }

    eatAnim(): void {
        if(this.speed < 0) this.play('eat_left', true);
        else this.play('eat_right', true);
    }

    front(): number {
        if(this.speed < 0) return 4;
        return 2;
    }
}
