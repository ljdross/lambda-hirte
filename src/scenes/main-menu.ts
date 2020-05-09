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
        this.load.pack(
            "preload",
            "assets/pack.json",
            "preload"
        );
    }

    create(): void {
        const width = this.sys.game.canvas.width;
        const height = this.sys.game.canvas.height;
        const grass = this.add.image(0, 0, 'grass');
        grass.setDisplaySize(2 * this.sys.canvas.width, 2 * this.sys.canvas.height);

        const sheep = this.physics.add.image(400, 100, 'sheep_horizontal');

        const levels = this.add.image(width / 2, height / 2, 'levels');
        levels.setDisplaySize(0.1 * width, 0.1 * height);
        levels.setInteractive(({ useHandCursor: true }));
        levels.on('pointerdown', () => {
            // this.scene.pause('MainMenu')
            // this.scene.start('Level1');
        });

        const menu = this.add.image(this.sys.game.canvas.width - 50, 20, 'menu');
        menu.setDisplaySize(0.05 * this.sys.canvas.width, 0.05 * this.sys.canvas.height);
        menu.setInteractive(({ useHandCursor: true }));
        menu.on('pointerdown', () => {
            this.scene.pause('MainMenu')
            this.scene.start('Level1');
        });

        const restart = this.add.text(this.sys.game.canvas.width - 400, 10, `Restart`, {fill: '#0f0'});
        restart.setInteractive();
        restart.on('pointerdown', () => {
            const mainMenu = this.scene.get('MainMenu');
            mainMenu.scene.restart();
        });

        sheep.setVelocity(100, 200);
        sheep.setBounce(1, 1);
        sheep.setCollideWorldBounds(true);
    }
}
