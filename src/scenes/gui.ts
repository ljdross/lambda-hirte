import {initOptionsButton, initSettings, updateLevelButton} from "../util/functions";
import {createButton} from "../util/plugins";

const COLOR_LIGHT = 0xAEFFFD;
const COLOR_DARK = 0xFFFFFF;
const COLOR_DARK_BLUE = 0x00008B;

export class GuiScene extends Phaser.Scene {
    private rexUI: any;
    public currentLevel: string;
    public winningScore: number;
    public showGrid: boolean;
    public musicVolume: number;
    public brightness: number;

    constructor() {
        super({
            key: "Gui",
            active: false
        });
    }

    init(data): void {
        this.currentLevel = data.currentLevel;
        this.winningScore = data.winningScore;
        initSettings(this, data);
    }

    preload(): void {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create(): void {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;

        const restart = this.add.image(width / 2, height / 2, `restart`);
        const continueGame = this.add.image(width / 2, height / 2 - 75, `continue`);
        const exitGame = this.add.image(width / 2, height / 2 + 150, `exit`);
        const menu = this.add.image(width - 100, 50, 'menu');
        const sheepCounter = this.add.text(width - 350, 40, "Save " + this.winningScore + " more sheeps!");
        const settingsData = initOptionsButton(this, width, height);
        const settings = settingsData.settings;
        const volume = settingsData.volume;
        const brightness = settingsData.brightness;
        const grid = settingsData.grid;
        const back = settingsData.backButton;

        const brightnessSlider = this.rexUI.add.slider({
            x: width / 2 + 50,
            y: height / 2,
            value: this.brightness,
            width: 200,
            height: 20,
            orientation: 'x',
            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            valuechangeCallback: value => {
                this.cameras.main.setAlpha(value * 2);
                this.brightness = value;
            },
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
            value: this.showGrid,
            orientation: 'y',
            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_DARK_BLUE),
            buttons: [
                createButton(this, 'Grid on', 'Grid')
            ],
            type: ((CheckboxesMode) ? 'checkboxes' : 'radio'),
            setValueCallback: (button, value) => {
                button.getElement('icon')
                    .setFillStyle((value)? COLOR_LIGHT : undefined);
                this.showGrid = value;
            }
        }).layout();
        gridCheckbox.visible = false;

        settings.on('pointerdown', () => {
            menu.visible = false;
            restart.visible = false;
            continueGame.visible = false;
            exitGame.visible = false;
            settings.visible = false;
            back.visible = true;
            brightness.visible = true;
            volume.visible = true;
            brightnessSlider.visible = true;
            volumeSlider.visible = true;
            grid.visible = true;
            gridCheckbox.visible = true;
        });

        back.on('pointerdown', () => {
            menu.visible = true;
            restart.visible = true;
            continueGame.visible = true;
            exitGame.visible = true;
            settings.visible = true;
            back.visible = false;
            brightness.visible = false;
            volume.visible = false;
            brightnessSlider.visible = false;
            volumeSlider.visible = false;
            grid.visible = false;
            gridCheckbox.visible = false;
        });

        restart.visible = false;
        restart.setDisplaySize(0.125 * width, 0.125 * height);
        restart.setInteractive(({ useHandCursor: true }));
        restart.on('pointerdown', () => {
            const currentScene = this.scene.get(this.currentLevel);
            currentScene.scene.restart();
            this.scene.restart();
        });

        continueGame.visible = false;
        continueGame.setDisplaySize(0.1 * width, 0.1 * height);
        continueGame.setInteractive(({ useHandCursor: true }));
        continueGame.on('pointerdown', () => {
            this.scene.resume(this.currentLevel);
            menu.visible = true;
            continueGame.visible = false;
            restart.visible = false;
            exitGame.visible = false;
            settings.visible = false;
            sheepCounter.visible = true;
        });

        exitGame.visible = false;
        exitGame.setDisplaySize(0.1 * width, 0.1 * height);
        exitGame.setInteractive(({ useHandCursor: true }));
        exitGame.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.stop(this.currentLevel);
            this.scene.stop('GuiScene');
            this.scene.start('MainMenu', {
                showGrid: this.showGrid,
                brightness: this.brightness,
                musicVolume: this.musicVolume
            });
        });

        menu.setDisplaySize(50, 50);
        menu.setInteractive(({ useHandCursor: true }));
        menu.on('pointerdown', () => {
            this.scene.pause(this.currentLevel);
            menu.visible = false;
            continueGame.visible = true;
            restart.visible = true;
            exitGame.visible = true;
            settings.visible = true;
            sheepCounter.visible = false;
        });
    }
}
