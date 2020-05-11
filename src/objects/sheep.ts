import 'phaser';

export abstract class Sheep extends Phaser.GameObjects.Sprite {
    protected speed: integer;
    protected gameWidth: number;
    protected gameHeight: number;

    protected constructor(config) {
        super(config.scene, config.x, config.y, "sheep_small");
        config.scene.add.existing(this);
        this.speed = Phaser.Math.Between(0.3 , 1);
        this.gameWidth = config.gameWidth;
        this.gameHeight = config.gameHeight;
        this.setInteractive();
    }

    //needs to be called in scene for each sheep
    update(...args): void {
        super.update(...args);
        this.move();
        this.obstacle();
    }

    abstract move(): void;

    abstract obstacle(): void;

}

export class SheepVertical extends Sheep {
    constructor(config) {
        super(config);
    }

    move(): void {
        if(this.speed == 0 ) {
            this.speed = -0.3;
        }
        this.y += this.speed;
    }

    obstacle(): void {
        if((this.speed < 0 && this.y <= 0) || (this.speed > 0 && this.y >= this.gameHeight)) {
            this.speed *= (-1);
        }
    }
}

export class SheepHorizontal extends Sheep {
    constructor(config) {
        super(config);
    }

    move(): void {
        if(this.speed == 0 ) {
            this.speed = -0.3;
        }
        this.x += this.speed;
    }

    obstacle(): void {
        if((this.speed < 0 && this.x <= 0) || (this.speed > 0 && this.x >= this.gameWidth)
            || this.scene.data.get('collision') == 1) {
            this.speed *= (-1);
        }
    }

}