import {initButton, initLevelButton} from "../util/functions"
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
        const settings = this.add.image(width / 2, height / 2 - 100, 'settings');

        const level1 = this.add.image(width / 2 - 100, height / 2 - 100, 'one');
        initLevelButton(level1, this.scene, width, height)

        const level2 = this.add.image(width / 2 , height / 2 - 100, 'two');
        initLevelButton(level2, this.scene, width, height)

        const level3 = this.add.image(width / 2 + 100, height / 2 - 100, 'three');
        initLevelButton(level3, this.scene, width, height)

        const level4 = this.add.image(width / 2 - 100 , height / 2, 'four');
        initLevelButton(level4, this.scene, width, height)

        const level5 = this.add.image(width / 2, height / 2, 'five');
        initLevelButton(level5, this.scene, width, height)

        const level6 = this.add.image(width / 2 + 100, height / 2, 'six');
        initLevelButton(level6, this.scene, width, height)

        const level7 = this.add.image(width / 2 - 100, height / 2 + 100, 'seven');
        initLevelButton(level7, this.scene, width, height)

        const level8 = this.add.image(width / 2, height / 2 + 100, 'eight');
        initLevelButton(level8, this.scene, width, height)

        const level9 = this.add.image(width / 2 + 100, height / 2 + 100, 'nine');
        initLevelButton(level9, this.scene, width, height)

        const back = this.add.image(width / 2 + 200, height / 2 - 100, 'back');
        back.setDisplaySize(0.05   * width, 0.1 * height);
        back.setInteractive(({ useHandCursor: true }));
        back.visible = false;
        back.on('pointerdown', () => {
            levels.visible = true;
            settings.visible = true;
            back.visible = false;
            level1.visible = false;
            level2.visible = false;
            level3.visible = false;
            level4.visible = false;
            level5.visible = false;
            level6.visible = false;
            level7.visible = false;
            level8.visible = false;
            level9.visible = false;
        });

        settings.setDisplaySize(0.1 * width, 0.1 * height);
        initButton(settings);
        settings.on('pointerdown', () => {
            levels.visible = false;
            settings.visible = false;
            back.visible = true;
        });

        levels.setDisplaySize(0.1 * width, 0.1 * height);
        initButton(levels);
        levels.on('pointerdown', () => {
            levels.visible = false;
            settings.visible = false;
            back.visible = true;
            level1.visible = true;
            level2.visible = true;
            level3.visible = true;
            level4.visible = true;
            level5.visible = true;
            level6.visible = true;
            level7.visible = true;
            level8.visible = true;
            level9.visible = true;
        });
    }
}
