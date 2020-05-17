import 'phaser';
import {MainMenu} from "./scenes/main-menu";
import {Level1} from "./scenes/level-1";
import {GuiScene} from "./scenes/gui";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainMenu, Level1, GuiScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0}
        }
    },
};

const game = new Phaser.Game(config);
