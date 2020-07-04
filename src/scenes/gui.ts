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
    public teleportGuiScene: Phaser.Scene;

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

        const winningBackground = this.add.image(width / 2, height / 2, "winningBackground");
        winningBackground.visible = false;
        const restart = this.add.image(width / 2, height / 2, `restart`);
        const continueGame = this.add.image(width / 2, height / 2 - 75, `continue`);
        const exitGame = this.add.image(width / 2, height / 2 + 150, `exit`);
        const menu = this.add.image(width - 100, 50, 'menu');
        const sheepCounter = this.add.text(width - 350, 40, "Save " + this.winningScore + " more sheep!");
        const gameWon = this.add.image(width / 2, height / 2, "gameWon");
        gameWon.visible = false;
        const firstStar = this.add.image(width / 2 - 50, height / 2 - 150, "star");
        firstStar.setDisplaySize(0.0625 * width, 0.0625 * height);
        firstStar.visible = false;
        const secondStar = this.add.image(width / 2, height / 2 - 150, "star");
        secondStar.setDisplaySize(0.0625 * width, 0.0625 * height);
        secondStar.visible = false;
        const thirdStar = this.add.image(width / 2 + 50, height / 2 - 150, "star");
        thirdStar.setDisplaySize(0.0625 * width, 0.0625 * height);
        thirdStar.visible = false;
        const settingsData = initOptionsButton(this, width, height);
        const settings = settingsData.settings;
        const volume = settingsData.volume;
        const grid = settingsData.grid;
        const back = settingsData.backButton;

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
            orientation: 'y',
            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_DARK_BLUE),
            buttons: [
                createButton(this, 'Grid on', 'Grid')
            ],
            type: ((CheckboxesMode) ? 'checkboxes' : 'radio'),
            setValueCallback: (button, value) => {
                button.getElement('icon')
                    .setFillStyle((value)? COLOR_LIGHT : undefined);
            }
        }).layout();

        if (this.showGrid) gridCheckbox.buttons[0].getElement('icon').setFillStyle(COLOR_LIGHT);
        gridCheckbox.on('button.click', () => {
            this.showGrid = !this.showGrid;
        });
        gridCheckbox.visible = false;

        settings.on('pointerdown', () => {
            menu.visible = false;
            restart.visible = false;
            continueGame.visible = false;
            exitGame.visible = false;
            settings.visible = false;
            back.visible = true;
            volume.visible = true;
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
            volume.visible = false;
            volumeSlider.visible = false;
            grid.visible = false;
            gridCheckbox.visible = false;
        });

        restart.visible = false;
        restart.setDisplaySize(0.125 * width, 0.125 * height);
        restart.setInteractive(({ useHandCursor: true }));
        restart.on('pointerdown', () => {
            const currentScene = this.scene.get(this.currentLevel);
            currentScene.events.off('changedata-playerScore');
            currentScene.scene.restart();
            const teleportGUI = this.scene.get('teleportGUI');
            teleportGUI.scene.restart();
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
            this.scene.stop('teleportGUI');
            this.scene.start('MainMenu', {
                showGrid: this.showGrid,
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
        this.scene.get(this.currentLevel).data.events.on('changedata-playerScore', (scene, value) => {
            if (value >= this.winningScore) {
                sheepCounter.setText("");
                setTimeout(() => {
                    this.sound.stopAll();
                    this.scene.stop(this.currentLevel);
                    this.scene.stop('GuiScene');
                    this.scene.stop('teleportGUI');
                    winningBackground.visible = true;
                    exitGame.visible = true;
                    gameWon.visible = true;
                    menu.visible = false;
                    firstStar.visible = true;
                    const teleportersCounter = this.scene.get('teleportGUI').data.get("teleportersCounter");
                    if (teleportersCounter < 10) secondStar.visible = true;
                    if (teleportersCounter < 5) thirdStar.visible = true;
                }, 2000);
            } else {
                sheepCounter.setText("Save " + (this.winningScore - value) + " more sheep!");
            }
        });
    }
}
