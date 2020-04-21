import 'phaser';

function preload () {
    this.load.setBaseURL('https://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('dude', 'assets/sprites/phaser-dude.png');
    this.load.image('red', 'assets/particles/red.png');
}

function create () {
    const sky = this.add.image(0, 0, 'sky');
    sky.setDisplaySize(2 * this.sys.canvas.width, this.sys.canvas.height);

    const particles = this.add.particles('red');

    const emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'});

    const dude = this.physics.add.image(400, 100, 'dude');

    dude.setVelocity(100, 200);
    dude.setBounce(1, 1);
    dude.setCollideWorldBounds(true);

    emitter.startFollow(dude);
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);
