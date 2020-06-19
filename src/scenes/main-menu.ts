import {initLevelButton, initSettings, updateLevelButton} from "../util/functions"
import {createButton} from "../util/plugins";
import {Board} from "../objects/board";
import {physicsSettings} from "../util/data";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: true,
    visible: true,
    key: 'MainMenu',
    physics: physicsSettings
};

const COLOR_LIGHT = 0xAEFFFD;
const COLOR_DARK = 0xFFFFFF;
const COLOR_DARK_BLUE = 0x00008B;

export class MainMenu extends Phaser.Scene {

    private rexUI: any;
    private song: Phaser.Sound.BaseSound;
    public showGrid: boolean;
    public musicVolume: number;

    constructor() {
        super(sceneConfig);
    }

      init(data): void {
        initSettings(this, data);
      }

    preload(): void {
        this.load.spritesheet('fence_h','assets/sprites/fence_horizontal.png',{frameHeight:32 ,frameWidth: 160});
        this.load.spritesheet('fence_v','assets/sprites/fence_vertical.png',{frameHeight:160 ,frameWidth: 32});
        this.load.spritesheet('portal','assets/sprites/teleporter_portal.png',{frameHeight:128 ,frameWidth: 128});
        this.load.spritesheet('sheep_h','assets/sprites/sheep_horizontal.png',{frameHeight:100 ,frameWidth: 100});
        this.load.spritesheet('sheep_v','assets/sprites/sheep_vertical.png',{frameHeight:100 ,frameWidth: 100});
        this.load.pack(
            "preload",
            "assets/pack.json",
            "preload"
        );
        this.load.audio('mainsong', 'assets/sounds/mainsong.mp3', {instances: 1 });
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create(): void {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const board = new Board(16, 12, this.showGrid);
        board.draw(this);

        this.song = this.sound.add('mainsong');
        const musicConfig = {
            volume: this.musicVolume,
            loop: true,
        }
        this.song.play(musicConfig);

        const settingsData = {
            showGrid: this.showGrid,
            musicVolume: this.musicVolume,
        }

        const level1 = this.add.image(width / 2 - 100, height / 2 - 100, 'one');
        const level2 = this.add.image(width / 2 , height / 2 - 100, 'two');
        const level3 = this.add.image(width / 2 + 100, height / 2 - 100, 'three');
        const level4 = this.add.image(width / 2 - 100 , height / 2, 'four');
        const level5 = this.add.image(width / 2, height / 2, 'five');
        const level6 = this.add.image(width / 2 + 100, height / 2, 'six');
        const level7 = this.add.image(width / 2 - 100, height / 2 + 100, 'seven');
        const level8 = this.add.image(width / 2, height / 2 + 100, 'eight');
        const level9 = this.add.image(width / 2 + 100, height / 2 + 100, 'nine');
        // TODO rework buttons Init to pass all levels at once
        initLevelButton(this, level1, width, height, settingsData, "level1");
        initLevelButton(this, level2, width, height, settingsData, "level2")
        initLevelButton(this, level3, width, height, settingsData, "level3")
        initLevelButton(this, level4, width, height, settingsData, "level4")
        initLevelButton(this, level5, width, height, settingsData, "level5")
        initLevelButton(this, level6, width, height, settingsData, "level6")
        initLevelButton(this, level7, width, height, settingsData, "level7")
        initLevelButton(this, level8, width, height, settingsData, "level8")
        initLevelButton(this, level9, width, height, settingsData, "level9")

        const volumeSlider = this.rexUI.add.slider({
            x: width / 2 + 50,
            y: height / 2 - 100,
            value: this.musicVolume,
            width: 200,
            height: 20,
            orientation: 'x',
            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            input: 'drag', // 'drag'|'click'
            valuechangeCallback: value => {
                this.sound.volume = value;
                this.musicVolume = value;
                const settingsDataNew = {
                    showGrid: this.showGrid,
                    musicVolume: this.musicVolume,
                };
                updateLevelButton(this, level1, settingsDataNew);
            },
            space: {
                top: 4,
                bottom: 4
            },
        }).layout();
        volumeSlider.visible = false;

        const CheckboxesMode = true;  // False = radio mode
        const gridCheckbox = this.rexUI.add.buttons({
            x: width / 2 + 50,
            y: height / 2 + 100,
            orientation: 'y',
            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_DARK_BLUE),
            buttons: [
                createButton(this, 'Grid on', 'Grid')
            ],
            type: ((CheckboxesMode) ? 'checkboxes' : 'radio'),
            setValueCallback: (button, value) => {
                button.getElement('icon')
                    .setFillStyle((value)? COLOR_LIGHT : undefined);
                const settingsDataNew = {
                    showGrid: this.showGrid,
                    musicVolume: this.musicVolume,
                };
                updateLevelButton(this, level1, settingsDataNew);
            }
        }).layout();

        if (this.showGrid) gridCheckbox.buttons[0].getElement('icon').setFillStyle(COLOR_LIGHT);
        gridCheckbox.on('button.click', () => {
            this.showGrid = !this.showGrid;
        });
        gridCheckbox.visible = false;

        const play = this.add.image(width / 2, height / 2 - 75, 'levels');
        const settings = this.add.image(width / 2, height / 2, 'settings');
        const volume = this.add.image(width / 2 - 100, height / 2 - 100, 'volume');
        const grid = this.add.image(width / 2 - 100, height / 2 + 100, 'grid');
        const back = this.add.image(width / 2 + 200, height / 2 - 100, 'back');

        volume.setDisplaySize(0.05   * width, 0.1 * height);
        volume.visible = false;
        grid.setDisplaySize(0.05   * width, 0.1 * height);
        grid.visible = false;
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
            volume.visible = false;
            volumeSlider.visible = false;
            grid.visible = false;
            gridCheckbox.visible = false;
        });

        settings.setDisplaySize(0.1 * width, 0.1 * height);
        settings.setInteractive(({ useHandCursor: true }));
        settings.on('pointerdown', () => {
            play.visible = false;
            settings.visible = false;
            back.visible = true;
            volume.visible = true;
            volumeSlider.visible = true;
            grid.visible = true;
            gridCheckbox.visible = true;
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
