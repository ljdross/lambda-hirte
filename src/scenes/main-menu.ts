import {initButton, generateSheeps} from "../util/functions"
import {Board} from "../objects/board";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: true,
  visible: true,
  key: 'MainMenu',
};

export class MainMenu extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    preload(): void {
        this.load.spritesheet('portal','assets/sprites/teleporter_portal.png',{frameHeight:128 ,frameWidth: 128});
        this.load.spritesheet('sheep_h','assets/sprites/sheep_horizontal.png',{frameHeight:100 ,frameWidth: 100});
        this.load.spritesheet('sheep_v','assets/sprites/sheep_vertical.png',{frameHeight:100 ,frameWidth: 100});
        this.load.pack(
            "preload",
            "assets/pack.json",
            "preload"
        );
    }

    create(): void {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const board = new Board(16, 12, 0);
        board.draw(this);

        const levels = this.add.image(width / 2, height / 2, 'levels');
        levels.setDisplaySize(0.1 * width, 0.1 * height);
        initButton(levels);
        levels.on('pointerdown', () => {
            this.scene.stop('MainMenu');
            this.scene.start('Gui', {currentLevel: 'Level1'});
            this.scene.start('Level1');
        });

        const level1 = this.add.image(width / 2, height / 2, 'one');
        level1.setDisplaySize(0.05   * width, 0.1 * height);
        level1.setInteractive(({ useHandCursor: true }));
        level1.on('pointerdown', () => {
            this.scene.stop('MainMenu');
            this.scene.start('Gui', {currentLevel: 'Level1'});
            this.scene.start('Level1');
        });

        const settings = this.add.image(width / 2, height / 2 - 100, 'settings');
        settings.setDisplaySize(0.1 * width, 0.1 * height);
        initButton(settings);
        settings.on('pointerdown', () => {
            this.scene.stop('MainMenu');
            this.scene.start('Gui', {currentLevel: 'Level1'});
            this.scene.start('Level1');
        });
    }
}
