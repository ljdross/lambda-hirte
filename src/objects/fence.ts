import 'phaser';

export class Fence extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        if (sprite === 'fence_h') {
            this.setSize(128, 4);
        } else {
            this.setSize(4, 128);
        }
        this.body.debugShowBody = false;
    }
}