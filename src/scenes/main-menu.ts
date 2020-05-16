import {initLevelButton} from "../util/functions"
import {Board} from "../objects/board";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: true,
  visible: true,
  key: 'MainMenu',
};

const COLOR_LIGHT = 0xAEFFFD;
const COLOR_DARK = 0xFFFFFF;

export class MainMenu extends Phaser.Scene {
    private rexUI: any;
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
        this.load.audio('mainsong', ['assets/sounds/mainsong.mp3']);
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create(): void {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const board = new Board(16, 12, 0);
        board.draw(this);

        const mainSong = this.sound.add('mainsong');
        const musicConfig = {
            volume: 1,
            loop: true,
        }
        mainSong.play(musicConfig);

        const brightnessSlider = this.rexUI.add.slider({
            x: width / 2 + 50,
            y: height / 2,
            width: 200,
            height: 20,
            orientation: 'x',
            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            input: 'drag', // 'drag'|'click'
            space: {
                top: 4,
                bottom: 4
            },
        }).layout();
        brightnessSlider.visible = false;
        const volumeSlider = this.rexUI.add.slider({
            x: width / 2 + 50,
            y: height / 2 - 100,
            width: 200,
            height: 20,
            orientation: 'x',
            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            input: 'drag', // 'drag'|'click'
            valuechangeCallback: function (value) {
                if (value){
                    this.setVolume = value;
                }
            },
            space: {
                top: 4,
                bottom: 4
            },
        }).layout();
        volumeSlider.visible = false;

        const play = this.add.image(width / 2, height / 2 - 75, 'levels');
        const settings = this.add.image(width / 2, height / 2, 'settings');

        const volume = this.add.image(width / 2 - 100, height / 2 - 100, 'volume');
        volume.setDisplaySize(0.05   * width, 0.1 * height);
        volume.visible = false;

        const brightness = this.add.image(width / 2 - 100, height / 2, 'brightness');
        brightness.setDisplaySize(0.05   * width, 0.1 * height);
        brightness.visible = false;

        const level1 = this.add.image(width / 2 - 100, height / 2 - 100, 'one');
        initLevelButton(this, level1, width, height)

        const level2 = this.add.image(width / 2 , height / 2 - 100, 'two');
        initLevelButton(this, level2, width, height)

        const level3 = this.add.image(width / 2 + 100, height / 2 - 100, 'three');
        initLevelButton(this, level3, width, height)

        const level4 = this.add.image(width / 2 - 100 , height / 2, 'four');
        initLevelButton(this, level4, width, height)

        const level5 = this.add.image(width / 2, height / 2, 'five');
        initLevelButton(this, level5, width, height)

        const level6 = this.add.image(width / 2 + 100, height / 2, 'six');
        initLevelButton(this, level6, width, height)

        const level7 = this.add.image(width / 2 - 100, height / 2 + 100, 'seven');
        initLevelButton(this, level7, width, height)

        const level8 = this.add.image(width / 2, height / 2 + 100, 'eight');
        initLevelButton(this, level8, width, height)

        const level9 = this.add.image(width / 2 + 100, height / 2 + 100, 'nine');
        initLevelButton(this,level9, width, height)

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
            brightness.visible = false;
            volume.visible = false;
            brightnessSlider.visible = false;
            volumeSlider.visible = false;
        });

        settings.setDisplaySize(0.1 * width, 0.1 * height);
        settings.setInteractive(({ useHandCursor: true }));
        settings.on('pointerdown', () => {
            play.visible = false;
            settings.visible = false;
            back.visible = true;
            brightness.visible = true;
            volume.visible = true;
            brightnessSlider.visible = true;
            volumeSlider.visible = true;
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
