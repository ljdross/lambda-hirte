import {Tile, Type, Board} from "../objects/board"
import {generateSheeps} from "../util/functions";

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
    
    const board = new Board(16, 12, 0);
    board.tiles[2][2] = new Tile(Type.Sand);
    board.tiles[3][2] = new Tile(Type.Sand);
    board.tiles[1][3] = new Tile(Type.Stone);
    board.tiles[2][3] = new Tile(Type.Stone);
    board.tiles[3][3] = new Tile(Type.Stone);
    board.draw(this);

    generateSheeps(5, this.physics, this.sys.game.canvas.width, this.sys.game.canvas.height);
  }
  
  update(): void {
    // TODO
  }
}
