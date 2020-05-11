import 'phaser';

export abstract class Sheep extends Phaser.GameObjects.Sprite {
    protected speed: number;
    protected gameWidth: number;
    protected gameHeight: number;
    protected goal: boolean;

    protected constructor(private config, sprite) {
        super(config.scene, config.x, config.y, sprite);
        config.scene.add.existing(this);
        this.speed = Phaser.Math.Between(0.3 , 1);
        this.gameWidth = config.gameWidth;
        this.gameHeight = config.gameHeight;
        this.goal = false;
        this.setInteractive();
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

    onGoal(): void {
        // TODO check if on Goal or make public
        this.goal = true;
    }

}

export class SheepVertical extends Sheep {
    constructor(config) {
        super(config, "sheep_small");
    }

    move(): void {
        if(this.speed == 0 ) this.speed = -0.3;
        if(this.goal == false) this.y += this.speed;
    }

    obstacle(): void {
        if((this.speed < 0 && this.y <= 0) || (this.speed > 0 && this.y >= this.gameHeight)) {
            this.speed *= (-1);
        }
    }
}

export class SheepHorizontal extends Sheep {
    constructor(config) {
        super(config, "sheep_small");
    }

    move(): void {
        if(this.speed == 0 ) this.speed = -0.3;
        if(this.goal == false) this.x += this.speed;
    }

    obstacle(): void {
        if((this.speed < 0 && this.x <= 0) || (this.speed > 0 && this.x >= this.gameWidth)
            || this.scene.data.get('collision') == 1) {
            this.speed *= (-1);
        }
    }
}