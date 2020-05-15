import {initLevelButton} from "../util/functions"
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
        this.load.audio('mainsong', ['assets/sounds/mainsong.ogg']);

    }

    create(): void {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const board = new Board(16, 12, 0);
        board.draw(this);

        this.sound.play('mainsong', {
            loop: true,
            volume: 1
        })

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const currentscene = this;
        const play = this.add.image(width / 2, height / 2 - 75, 'levels');
        const settings = this.add.image(width / 2, height / 2, 'settings');

        const level1 = this.add.image(width / 2 - 100, height / 2 - 100, 'one');
        initLevelButton(currentscene, level1, width, height)

        const level2 = this.add.image(width / 2 , height / 2 - 100, 'two');
        initLevelButton(currentscene, level2, width, height)

        const level3 = this.add.image(width / 2 + 100, height / 2 - 100, 'three');
        initLevelButton(currentscene, level3, width, height)

        const level4 = this.add.image(width / 2 - 100 , height / 2, 'four');
        initLevelButton(currentscene, level4, width, height)

        const level5 = this.add.image(width / 2, height / 2, 'five');
        initLevelButton(currentscene, level5, width, height)

        const level6 = this.add.image(width / 2 + 100, height / 2, 'six');
        initLevelButton(currentscene, level6, width, height)

        const level7 = this.add.image(width / 2 - 100, height / 2 + 100, 'seven');
        initLevelButton(currentscene, level7, width, height)

        const level8 = this.add.image(width / 2, height / 2 + 100, 'eight');
        initLevelButton(currentscene, level8, width, height)

        const level9 = this.add.image(width / 2 + 100, height / 2 + 100, 'nine');
        initLevelButton(currentscene,level9, width, height)

        const back = this.add.image(width / 2 + 200, height / 2 - 100, 'back');
        back.setDisplaySize(0.05   * width, 0.1 * height);
        back.setInteractive(({ useHandCursor: true }));
        back.visible = false;
        back.on('pointerdown', () => {
            play.visible = true;
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
        settings.setInteractive(({ useHandCursor: true }));
        settings.on('pointerdown', () => {
            play.visible = false;
            settings.visible = false;
            back.visible = true;
        });

        play.setDisplaySize(0.1 * width, 0.1 * height);
        play.setInteractive(({ useHandCursor: true }));
        play.on('pointerdown', () => {
            play.visible = false;
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
