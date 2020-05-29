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
    this.board = new Board(7, 6, this.showGrid);
    this.board.tiles[2][3] = new Tile(Type.Sand);
    this.board.tiles[3][3] = new Tile(Type.Sand);
    this.board.tiles[2][4] = new Tile(Type.Sand);
    this.board.tiles[3][4] = new Tile(Type.Sand);
    this.board.tiles[2][5] = new Tile(Type.Sand);
    this.board.tiles[3][5] = new Tile(Type.Sand);
    this.board.tiles[1][4] = new Tile(Type.Sand);
    this.board.tiles[4][4] = new Tile(Type.Sand);
    this.board.tiles[5][4] = new Tile(Type.Sand);
    this.board.tiles[4][5] = new Tile(Type.Sand);

    this.board.tiles[3][2] = new Tile(Type.Stone);
    this.board.tiles[5][2] = new Tile(Type.Stone);
    this.board.tiles[3][1] = new Tile(Type.Stone);
    this.board.tiles[5][1] = new Tile(Type.Stone);
    this.board.tiles[4][1] = new Tile(Type.Stone);
    this.board.tiles[4][2] = new Tile(Type.Stone);
    this.board.tiles[6][1] = new Tile(Type.Stone);
    this.board.tiles[6][0] = new Tile(Type.Stone);



    this.board.tiles[4][3].isDestination = true;
    this.board.draw(this);

    //generate Sheep like this
    const s1=new SheepVertical({scene:this,x:480,y:400}, 2);
    const s2=new SheepHorizontal({scene:this,x:300,y:400});
    const s3=new SheepHorizontal({scene:this,x:100,y:270});
    const s4=new SheepVertical({scene:this,x:480,y:500});
    const s6=new SheepHorizontal({scene:this,x:100,y:100});
    const s7=new SheepHorizontal({scene:this,x:700,y:600});

    //add to List
    this.sheep = this.add.group();
    this.sheep.addMultiple([s1, s2, s3, s4, s6, s7]);




    this.physics.world.addCollider(this.sheep, this.sheep, (sheep1: Sheep, sheep2: Sheep) => {
      sheep1.collide(sheep2);
      sheep2.collide(sheep1);
    })

  }

  update(): void {
    //update all sheep
    for(const sheep of this.sheep.getChildren()) {
      sheep.update();
    }
    // TODO
  }
}
