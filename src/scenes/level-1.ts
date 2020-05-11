import {Tile, Type, Board} from "../objects/board"
import {generateSheeps, randomInt} from "../util/functions";
import {Sheep,  SheepHorizontal, SheepVertical} from "../objects/sheep";
import Systems = Phaser.Scenes.Systems;

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Level1',
}

export class Level1 extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private list: Array<Sheep>; //List of all Sheep
  
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

    const { width, height } = this.sys.game.canvas;

    //generate Sheep like this
    const s1=new SheepVertical({scene:this,x:500,y:400,gameWidth: width,gameHeight: height});
    const s2=new SheepHorizontal({scene:this,x:300,y:400,gameWidth: width,gameHeight: height});
    //add to List
    this.list = [s1, s2] ;

  }
  
  update(): void {
    //update all sheep
    for(const s of this.list) {
      s.update();
    }
    // TODO
  }
}
