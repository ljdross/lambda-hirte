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

  create(): void {
    this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;

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
