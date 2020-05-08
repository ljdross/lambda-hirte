import {Tile, Type, Board} from "../objects/board"

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
    this.load.image('sand', 'assets/sprites/sand.png');
    this.load.image('stone', 'assets/sprites/stone.png');
  }
  
  create(): void {
    
    const board = new Board(8, 6, 50);
    board.tiles[2][2] = new Tile(Type.Sand);
    board.tiles[3][2] = new Tile(Type.Sand);
    board.tiles[1][3] = new Tile(Type.Stone);
    board.tiles[2][3] = new Tile(Type.Stone);
    board.tiles[3][3] = new Tile(Type.Stone);
    board.draw(this);
    
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
