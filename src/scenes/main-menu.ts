const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MainMenu',
};

export class MainMenu extends Phaser.Scene {
    public preload() {
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('dude', 'assets/sprites/phaser-dude.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    public create() {
        const sky = this.add.image(0, 0, 'sky');
        sky.setDisplaySize(2 * this.sys.canvas.width, this.sys.canvas.height);

        const particles = this.add.particles('red');

        const emitter = particles.createEmitter({
            speed: 100,
            scale: {start: 1, end: 0},
            blendMode: 'ADD'
        });

        const dude = this.physics.add.image(400, 100, 'dude');

        const canvasWidth = this.sys.game.canvas.width;

        const changeScene = this.add.text(canvasWidth - 200, 10, `Change Scene`, {fill: '#0f0'});
        changeScene.setInteractive();
        changeScene.on('pointerdown', () => {
            const mainScene = this.scene.get('MainScene');
            mainScene.scene.restart();
        });

        dude.setVelocity(100, 200);
        dude.setBounce(1, 1);
        dude.setCollideWorldBounds(true);

        emitter.startFollow(dude);
    }
}
