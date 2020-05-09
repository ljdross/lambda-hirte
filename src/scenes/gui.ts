import {initButton} from "../util/functions"

export class GuiScene extends Phaser.Scene {

    constructor() {
        super({
            key: "Gui",
            active: false
        });
    }

    create(): void {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const levelKeys = ['Level1']

        const menu = this.add.image(width - 50, 40, 'menu');
        menu.setDisplaySize(0.05 * width, 0.05 * height);
        initButton(menu);
        menu.on('pointerdown', () => {
            for (const levelKey of levelKeys) {
                this.scene.pause(levelKey);
            }
        });

        // const restart = this.add.image(width - 200, 20, `restart`);
        // restart.setDisplaySize(0.1 * width, 0.1 * height);
        // initButton(restart);
        // restart.on('pointerdown', () => {
        //     const mainMenu = this.scene.get('MainMenu');
        //     mainMenu.scene.restart();
        // });
    }

}
