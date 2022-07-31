import 'phaser';
import {MainMenu} from "./scenes/main-menu";
import {LevelTut1} from "./scenes/level-tut-1";
import {LevelTut2} from "./scenes/level-tut-2";
import {LevelTut3} from "./scenes/level-tut-3";
import {LevelTut4} from "./scenes/level-tut-4";
import {LevelTut5} from "./scenes/level-tut-5";
import {Level6} from "./scenes/level-6";
import {Level7} from "./scenes/level-7";
import {Level8} from "./scenes/level-8";
import {Level9} from "./scenes/level-9";
import {GuiScene} from "./scenes/gui";
import {TeleportGUIScene} from "./scenes/teleport-gui";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainMenu, LevelTut1, LevelTut2, LevelTut3, LevelTut4, LevelTut5, Level6, Level7, Level8, Level9, GuiScene, TeleportGUIScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: true
        }
    },
};

const game = new Phaser.Game(config);
