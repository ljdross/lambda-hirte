import 'phaser';
import {MainMenu} from "./scenes/main-menu";
import {Level1} from "./scenes/level-1";
import {GuiScene} from "./scenes/gui";
import {Level2} from "./scenes/level-2";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainMenu, Level1, Level2, GuiScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: true
        }
    },
};

const game = new Phaser.Game(config);
