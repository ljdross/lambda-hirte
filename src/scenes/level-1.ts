const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Level1',
};

export class Level1 extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };

  constructor() {
    super(sceneConfig);
  }

  preload(): void {
    this.load.image('grass', 'assets/sprites/grass.png');
  }

  create(): void {
    const grass = this.add.image(50, 50, 'grass');
    //grass.setScale(5);

    const mainMenu = this.add.text(this.sys.game.canvas.width - 200, 10, `Main Menu`, {fill: '#0f0'});
    mainMenu.setInteractive();
    mainMenu.on('pointerdown', () => {
        this.scene.pause('Level1')
        this.scene.start('MainMenu');
    });

  }

  update(): void {
    // TODO
  }
}
