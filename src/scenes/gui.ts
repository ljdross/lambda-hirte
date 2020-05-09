import {initButton} from "../util/functions"

export class GuiScene extends Phaser.Scene {
    private currentLevel: string;

    constructor() {
        super({
            key: "Gui",
            active: false
        });
    }

    init(data): void {
        this.currentLevel = data.currentLevel;
    }

    create(): void {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;

        const restart = this.add.image(width / 2, height / 2, `restart`);
        const continueGame = this.add.image(width / 2, height / 2 - 100, `continue`);
        const exitGame = this.add.image(width / 2, height / 2 + 100, `exit`);
        const menu = this.add.image(width - 50, 40, 'menu');

        restart.visible = false;
        restart.setDisplaySize(0.1 * width, 0.1 * height);
        initButton(restart);
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
        initButton(continueGame);
        continueGame.on('pointerdown', () => {
            this.scene.resume(this.currentLevel);
            menu.visible = true;
            continueGame.visible = false;
            restart.visible = false;
            exitGame.visible = false;
        });

        exitGame.visible = false;
        exitGame.setDisplaySize(0.1 * width, 0.1 * height);
        initButton(exitGame);
        exitGame.on('pointerdown', () => {
            this.scene.stop(this.currentLevel);
            this.scene.stop('GuiScene');
            this.scene.start('MainMenu');
        });

        menu.setDisplaySize(0.05 * width, 0.05 * height);
        initButton(menu);
        menu.on('pointerdown', () => {
            this.scene.pause(this.currentLevel);
            menu.visible = false;
            continueGame.visible = true;
            restart.visible = true;
            exitGame.visible = true;
        });
    }

}
