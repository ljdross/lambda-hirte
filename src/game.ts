import 'phaser';
import {MainMenu} from "./scenes/main-menu";
import {LevelTut1} from "./scenes/level-tut-1";
import {LevelTut2} from "./scenes/level-tut-2";
import {LevelTut3} from "./scenes/level-tut-3";
import {LevelTut4} from "./scenes/level-tut-4";
import {LevelTut5} from "./scenes/level-tut-5";
import {Level1} from "./scenes/level-1";
import {Level2} from "./scenes/level-2";
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
    scene: [MainMenu, LevelTut1, LevelTut2, LevelTut3, LevelTut4, LevelTut5, Level1, Level2, GuiScene, TeleportGUIScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: true
        }
    },
};

const game = new Phaser.Game(config);
