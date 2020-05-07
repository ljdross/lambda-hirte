import {teleport} from "../Teleport";

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
        //this.load.image("grass","assets/sprites/grass.png")
        this.load.spritesheet("sheep_horizontal","assets/sprites/sheep_horizontal.png",{frameHeight:100,frameWidth:100});
        this.load.pack(
            "preload",
            "assets/pack.json",
            "preload"
        );


    }

    create(): void {
        const grass = this.add.image(0, 0, 'grass');

        grass.setDisplaySize(2 * this.sys.canvas.width, 2 * this.sys.canvas.height);

        //const sheep = this.physics.add.image(400,100,"sheep_horizontal");

        const sheep = this.physics.add.sprite(400, 100, 'seep_horizontal');

        this.anims.create({
            key: 'sheep_anim',
            frames: this.anims.generateFrameNumbers('sheep_horizontal',{start:0 ,end:3 }),
            frameRate: 10 ,
            repeat: -1

        });


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
        sheep.play("sheep_anim");
        sheep.setVelocity(100, 0);
        sheep.setBounce(1, 1);
        sheep.setCollideWorldBounds(true);
    }
}
