import 'phaser';
import {MainMenu} from "./scenes/main-menu";
import {Level1} from "./scenes/level-1";
import {Level2} from "./scenes/level-2";
import {Level1Tut} from "./scenes/level-1-tut";
import {GuiScene} from "./scenes/gui";
import {TeleportGUIScene} from "./scenes/teleportGUI";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainMenu, Level1, Level2, Level1Tut, GuiScene, TeleportGUIScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: true
        }
    },
};

const game = new Phaser.Game(config);
