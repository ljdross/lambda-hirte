import {Tile, Type, Board} from "../objects/board"
import{Portal} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {initSettings} from "../util/functions";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Level1',
  physics: physicsSettings
};

export class Level1 extends Phaser.Scene {


  public sheep: Phaser.GameObjects.Group; //List of all Sheep
  public board: Board;
  public showGrid: boolean;
  public musicVolume: number;
  public brightness: number;
  public portals: Phaser.GameObjects.Group;

  constructor() {
    super(sceneConfig);
  }

  init(data): void {
      this.data.set('playerScore', 0);
      this.data.set('playerWinningScore', 10);
      initSettings(this, data);
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
    this.board = new Board(16, 12, this.showGrid);
    this.board.tiles[2][2] = new Tile(Type.Sand);
    this.board.tiles[3][2] = new Tile(Type.Sand);
    this.board.tiles[4][2] = new Tile(Type.Sand);
    this.board.tiles[5][2] = new Tile(Type.Sand);
    //create a Portal object using the Attribut (hasPortal) ,see the classes Tile and board.
    this.board.tiles[1][3] = new Tile(Type.Stone,true);
    this.board.tiles[2][3] = new Tile(Type.Stone);
    this.board.tiles[3][3] = new Tile(Type.Stone,true);
    this.board.tiles[7][3] = new Tile(Type.Sand);
    this.board.tiles[8][3] = new Tile(Type.Sand,true);
    this.board.tiles[2][2].isDestination = true;
    this.board.draw(this);

    //bind to portals.
    this.board.tiles[3][3].portal.setGoal(this.board.tiles[8][3]);
    this.board.tiles[8][3].portal.setGoal(this.board.tiles[1][3]);
    this.board.tiles[1][3].portal.setGoal(this.board.tiles[3][3]);
    //portals grouped
    this.portals = this.physics.add.group();
    this.portals.addMultiple([this.board.tiles[1][3].portal, this.board.tiles[3][3].portal, this.board.tiles[8][3].portal]);
    //


      //make the portal visible ..

      this.input.on("pointerdown",(pointer: Phaser.Input.Pointer)=>{
        const title =this.getTile(pointer.x,pointer.y);
        if(title.hasPortal == true){
          title.portal.setVisible(true);
          title.portal.createAnim(this);
          title.portal.play("Portal2");
          title.portal.chosen = true;
          title.portal.on("animationcomplete",()=>{
            title.portal.setVisible(false);

          })
        }
      })

    //generate Sheep like this
    const s1=new SheepVertical({scene:this,x:480,y:400}, 2);
    const s2=new SheepHorizontal({scene:this,x:300,y:400});
    const s3=new SheepHorizontal({scene:this,x:100,y:270})
    //add to List
    this.sheep = this.add.group();
    this.sheep.addMultiple([s1, s2, s3]);


    //.
    this.physics.world.addCollider(this.portals ,this.sheep, (sheep: Sheep, portal: Portal) => {
      portal.executeTeleport (this , sheep);

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
