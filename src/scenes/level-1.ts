import {Tile, Type, Board} from "../objects/board"
import {SheepHorizontal, SheepVertical} from "../objects/sheep";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Level1',
};

export class Level1 extends Phaser.Scene {
  get sheep(): Phaser.GameObjects.Group {
    return this._sheep;
  }

  set sheep(value: Phaser.GameObjects.Group) {
    this._sheep = value;
  }
  set board(value: Board) {
    this._board = value;
  }
  get board(): Board {
    return this._board;
  }

  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private _sheep: Phaser.GameObjects.Group; //List of all Sheep
  private _board: Board;
  
  constructor() {
    super(sceneConfig);
  }

  init(): void {
      this.data.set('playerScore', 0);
      this.data.set('playerWinningScore', 10);
  }

  create(): void {

    this.board = new Board(16, 12, 0);
    this.board.tiles[2][2] = new Tile(Type.Sand);
    this.board.tiles[3][2] = new Tile(Type.Sand);
    this.board.tiles[1][3] = new Tile(Type.Stone);
    this.board.tiles[2][3] = new Tile(Type.Stone);
    this.board.tiles[3][3] = new Tile(Type.Stone);
    this.board.tiles[7][3] = new Tile(Type.Sand);
    this.board.tiles[8][3] = new Tile(Type.Sand);
    this.board.tiles[2][2].isDestination = true;
    this.board.draw(this);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // const portal = new Portal(this,[2,2],[0,0],0,"portal");
    // portal.createAnim(this);

    //generate Sheep like this
    const s1=new SheepVertical({scene:this,x:500,y:400});
    const s2=new SheepHorizontal({scene:this,x:300,y:400});
    const s3=new SheepHorizontal({scene:this,x:100,y:270})
    //add to List
    this.sheep = this.add.group();
    this.sheep.addMultiple([s1, s2, s3]);

  }

  update(): void {
    //update all sheep
    for(const s of this.sheep.getChildren()) {
      s.update();
    }
    // TODO
  }
}
