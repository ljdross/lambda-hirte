import {initOptionsButton, initSettings} from "../util/functions";

export class GuiScene extends Phaser.Scene {
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

        settings.on('pointerdown', () => {
            menu.visible = false;
            restart.visible = false;
            continueGame.visible = false;
            exitGame.visible = false;
            settings.visible = false;
            back.visible = true;
            brightness.visible = true;
            volume.visible = true;
            // brightnessSlider.visible = true;
            // volumeSlider.visible = true;
            grid.visible = true;
            // gridCheckbox.visible = true;
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
            // brightnessSlider.visible = false;
            // volumeSlider.visible = false;
            grid.visible = false;
            // gridCheckbox.visible = false;
        });

        restart.visible = false;
        restart.setDisplaySize(0.125 * width, 0.125 * height);
        restart.setInteractive(({ useHandCursor: true }));
        restart.on('pointerdown', () => {
            const currentScene = this.scene.get(this.currentLevel);
            currentScene.scene.restart();
            menu.visible = true;
            continueGame.visible = false;
            restart.visible = false;
            exitGame.visible = false;
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
        });

        // settings.setDisplaySize(0.1 * width, 0.1 * height);
        // settings.setInteractive(({ useHandCursor: true }));
        // settings.on('pointerdown', () => {
        //     play.visible = false;
        //     settings.visible = false;
        //     back.visible = true;
        //     brightness.visible = true;
        //     volume.visible = true;
        //     brightnessSlider.visible = true;
        //     volumeSlider.visible = true;
        //     grid.visible = true;
        //     gridCheckbox.visible = true;
        // });
    }

}
