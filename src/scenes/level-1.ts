import {Tile, Type, Board} from "../objects/board"
import{Portal} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";

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
  get portals(): Phaser.GameObjects.Group {
    return this._portals;
  }

  set portals(value: Phaser.GameObjects.Group) {
    this._portals = value;
  }

  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private _sheep: Phaser.GameObjects.Group; //List of all Sheep
  private _board: Board;
  private _portals: Phaser.GameObjects.Group;
  constructor() {
    super(sceneConfig);
  }

  init(): void {
      this.data.set('playerScore', 0);
      this.data.set('playerWinningScore', 10);
  }

  // give back the tile with the coordinate(x,y)
  public getTile(x: number,y: number): Tile {
    const column = Math.floor(x / 128);
    if(this.board.tiles[column] != null) {
      const row = Math.floor(y / 128);
      return this.board.tiles[column][row];
    }
    return null
  }

  create(): void {

    this.board = new Board(16, 12, 0);
    this.board.tiles[2][2] = new Tile(Type.Sand);
    this.board.tiles[3][2] = new Tile(Type.Sand);
    //create a Portal object using the Attribut (hasPortal) ,see the classes Tile and board.
    this.board.tiles[1][3] = new Tile(Type.Stone,true);
    this.board.tiles[2][3] = new Tile(Type.Stone);
    this.board.tiles[3][3] = new Tile(Type.Stone,true);
    this.board.tiles[7][3] = new Tile(Type.Sand);
    this.board.tiles[8][3] = new Tile(Type.Sand,true);
    this.board.tiles[2][2].isDestination = true;
    this.board.draw(this);

    //portals grouped
    this.portals = this.physics.add.group();
    this.portals.addMultiple([this.board.tiles[1][3].portal, this.board.tiles[3][3].portal, this.board.tiles[8][3].portal]);

      //make the portal visible ..
      this.input.on("pointerdown",(pointer: Phaser.Input.Pointer)=>{
        const t =this.getTile(pointer.x,pointer.y);
        if(t.hasPortal == true){
          t.portal.setVisible(true);
          t.portal.createAnim(this);
          t.portal.play("Portal2");
          t.portal.on("animationcomplete",()=>{
            t.portal.setVisible(false);
          })
        }

      })



    //generate Sheep like this
    const s1=new SheepVertical({scene:this,x:500,y:400});
    const s2=new SheepHorizontal({scene:this,x:300,y:400});
    const s3=new SheepHorizontal({scene:this,x:100,y:270})
    //add to List
    this.sheep = this.add.group();
    this.sheep.addMultiple([s1, s2, s3]);

    //the portal vanish the sheep , a sprite for side effect needed.
    this.physics.world.addCollider(this.portals ,this.sheep, (s: Sheep, p: Portal) => {
      p.vanish(this,s);

    })

  }

  update(): void {
    //update all sheep
    for(const s of this.sheep.getChildren()) {
      s.update();
    }
    // TODO
  }
}
