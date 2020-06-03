import {Board, Tile, Type} from "../objects/board"
import {Portal, portalType} from "../objects/Teleport";
import {Sheep, SheepHorizontal, SheepVertical} from "../objects/sheep";
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
  public getTile(x: number,y: number): number[] {
    const coor = [];
    const column = Math.floor(x / 128);
    coor[0]=column;
    if(this.board.tiles[column] != null) {
      const row = Math.floor(y / 128);
      coor[1]=row
      return coor;
    }
    return null
  }

  create(): void {
    this.board = new Board(16, 12, this.showGrid);
    this.board.tiles[1][0] = new Tile(Type.Grass);
    this.board.tiles[8][0] = new Tile(Type.Grass);
    this.board.tiles[2][2] = new Tile(Type.Sand);
    this.board.tiles[3][2] = new Tile(Type.Sand);
    this.board.tiles[4][2] = new Tile(Type.Sand);
    this.board.tiles[5][2] = new Tile(Type.Sand);
    //create a Portal object using the Attribut (hasPortal) ,see the classes Tile and board.
    this.board.tiles[1][3] = new Tile(Type.Stone);
    this.board.tiles[2][3] = new Tile(Type.Stone);
    this.board.tiles[3][3] = new Tile(Type.Stone);
    this.board.tiles[7][3] = new Tile(Type.Sand);
    this.board.tiles[8][3] = new Tile(Type.Sand);
    this.board.draw(this);

    this.portals = this.physics.add.group();

    //generate Sheep like this
    const s1=new SheepVertical({scene:this,x:480,y:400}, 2);
    const s2=new SheepHorizontal({scene:this,x:300,y:400});
    const s3=new SheepHorizontal({scene:this,x:100,y:270});
    const s4=new SheepVertical({scene:this,x:480,y:500});
    const s5=new SheepVertical({scene:this,x:700,y:800});
    const s6=new SheepHorizontal({scene:this,x:100,y:100});
    const s7=new SheepHorizontal({scene:this,x:700,y:600});
    const s8=new SheepVertical({scene:this,x:700,y:900});

    //add to List
    this.sheep = this.add.group();
    this.sheep.addMultiple([s1, s2, s3, s4, s5, s6, s7, s8]);


    this.physics.world.addCollider(this.portals, this.sheep, (sheep: Sheep, portal: Portal) => {
      portal.executeTeleport (this, this.board, sheep);
    })

    this.physics.world.addCollider(this.sheep, this.sheep, (sheep1: Sheep, sheep2: Sheep) => {
      sheep1.collide(sheep2);
      sheep2.collide(sheep1);
    })

    this.scene.get('Gui').data.events.on('changedata-teleportersActivated', (scene, value) => {
      const teleportersActivated = scene.data.get('teleportersActivated');
      if (teleportersActivated) {
        //make the portal visible ..
        this.input.on("pointerdown",(pointer: Phaser.Input.Pointer)=>{
          //place the portal in the chosen tile.
          const coor =this.getTile(pointer.x,pointer.y);
          const tile = this.board.tiles[coor[0]][coor[1]];
          tile.portal = new Portal( this,coor[0]* 128 + 64,coor[1]* 128 + 64,"portal", portalType.gtosa);
          tile.portal.createAnim(this);
          tile.portal.play("Portal2");

          //find and set the goal-tile (based on a function ).
          const goal = tile.portal.whereToGo(this.board, tile.tileNumber, tile.type);
          tile.portal.setGoal(this.board.findTile(Type.Sand, goal));
          this.portals.add(tile.portal);
          tile.portal.chosen = true;
          tile.portal.on("animationcomplete",()=>{
            tile.portal.destroy();
          })
        })
      }
      else {
        this.input.off('pointerdown');
      }
    });
  }

  update(): void {
    //update all sheep
    for(const s of this.sheep.getChildren()) {
      s.update();
    }
  }
}
