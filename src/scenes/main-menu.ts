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
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('dude', 'assets/sprites/phaser-dude.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create(): void {
        const sky = this.add.image(0, 0, 'sky');
        sky.setDisplaySize(2 * this.sys.canvas.width, this.sys.canvas.height);

        const particles = this.add.particles('red');

        const emitter = particles.createEmitter({
            speed: 100,
            scale: {start: 1, end: 0},
            blendMode: 'ADD'
        });

        const dude = this.physics.add.image(400, 100, 'dude');

        const changeScene = this.add.text(this.sys.game.canvas.width - 200, 10, `Change Scene`, {fill: '#0f0'});
        changeScene.setInteractive();
        changeScene.on('pointerdown', () => {
            this.scene.pause('MainMenu')
            this.scene.start('Level1');
        });

        const restart = this.add.text(this.sys.game.canvas.width - 400, 10, `Restart`, {fill: '#0f0'});
        restart.setInteractive();
        restart.on('pointerdown', () => {
            const mainMenu = this.scene.get('MainMenu');
            mainMenu.scene.restart();
        });

        dude.setVelocity(100, 200);
        dude.setBounce(1, 1);
        dude.setCollideWorldBounds(true);

        emitter.startFollow(dude);
    }
}
