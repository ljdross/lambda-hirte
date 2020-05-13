import {Tile, Type, Board} from "../objects/board"
import{Portal} from "../objects/Teleport";
import {Sheep,  SheepHorizontal, SheepVertical} from "../objects/sheep";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Level1',
};

export class Level1 extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private list: Array<Sheep>; //List of all Sheep
  private board: Board;
  
  constructor() {
    super(sceneConfig);
  }

  create(): void {

    this.board = new Board(16, 12, 0);
    this.board.tiles[2][2] = new Tile(Type.Sand);
    this.board.tiles[3][2] = new Tile(Type.Sand);
    this.board.tiles[1][3] = new Tile(Type.Stone);
    this.board.tiles[2][3] = new Tile(Type.Stone);
    this.board.tiles[3][3] = new Tile(Type.Stone);
    this.board.tiles[2][2].isDestination = true;
    this.board.draw(this);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const portal = new Portal(this,[2,2],[0,0],0,"portal");
    portal.createAnim(this);

    //generate Sheep like this
    const s1=new SheepVertical({scene:this,x:500,y:400});
    const s2=new SheepHorizontal({scene:this,x:300,y:400});
    const s3=new SheepHorizontal({scene:this,x:100,y:270});
    //add to List
    this.list = [s1, s2, s3];

  }
  
  update(): void {
    //update all sheep
    for(const s of this.list) {
      s.update();
      s.onGoal(this.board);
    }
    // TODO
  }
}
