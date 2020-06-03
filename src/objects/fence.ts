import 'phaser';
import {Tile, Type, Board} from "../objects/board"


export class Fence extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this)
    }
}