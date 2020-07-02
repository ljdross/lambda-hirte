import {Board, Tile, Type} from "../objects/board"
import {Portal, portalType} from "../objects/Teleport";
import {Sheep, SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {getTileTypeWithKey, initSettings, getPortalTypeWithKey, makeCollider} from "../util/functions";
import {Fence} from "../objects/fence";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Level6',
  physics: physicsSettings
};

export class Level6 extends Phaser.Scene {

  public sheep: Phaser.GameObjects.Group; //List of all Sheep
  public fences: Phaser.GameObjects.Group; // List of all fences
  public portals: Phaser.GameObjects.Group; // List of all portals
  public board: Board;
  public showGrid: boolean;
  public musicVolume: number;
  public pFunction1 = {add: 3 , multi: 1};
  public pFunction2 = {add: 4 , multi: 1};
  public pFunction3 = {add: 8 , multi: 1};
  constructor() {
    super(sceneConfig);
  }

  init(data): void {
    this.data.set('playerScore', 0);
    initSettings(this, data);
  }

  public assignFunctionToPortalType(portal: Portal): void{

    if(portal.ptype == portalType.gtost)  portal.setFunction(this.pFunction1.add, this.pFunction1.multi);
    if(portal.ptype == portalType.sttosa) portal.setFunction(this.pFunction2.add, this.pFunction2.multi);
    if(portal.ptype == portalType.satog) portal.setFunction(this.pFunction3.add, this.pFunction3.multi);

  }

  public getTile( x: number, y: number): number[] {

    const coordinates = [];
    const column = Math.floor(x / 128);
    coordinates[0] = column;
    if (this.board.tiles[column] != null) {
      const row = Math.floor(y / 128);
      coordinates[1] = row
      return coordinates;
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
    this.sheep = this.add.group();
    this.portals = this.physics.add.group();

    let i: number;
    for (i = 0; i < 5; i++) {
      const sheep1 = new SheepHorizontal({
        scene: this,
        x: Phaser.Math.Between(50, 206),
        y: Phaser.Math.Between(30, 206)
      });
      const sheep2 = new SheepVertical({scene: this, x: Phaser.Math.Between(50, 206), y: Phaser.Math.Between(30, 206)});
      this.sheep.addMultiple([sheep1, sheep2]);
    }

    //fancy fences
    const f1 = new Fence(this, 2 * 128, 128 * 0.5, 'fence_v').setOrigin(0.5, 0.5);
    const f2 = new Fence(this, 2 * 128, 128 * 1.5, 'fence_v').setOrigin(0.5, 0.5);
    const f3 = new Fence(this, 0.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);
    const f4 = new Fence(this, 1.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);

    this.fences = this.add.group();
    this.fences.addMultiple([f1, f2, f3, f4]);

    // text to display function value
    this.add.text(this.sys.game.canvas.width - 170, 187, "+" + this.pFunction1.add, {font: "25px Arial"});
    this.add.text(this.sys.game.canvas.width - 170, 187 + 75, "+" + this.pFunction2.add, {font: "25px Arial"});
    this.add.text(this.sys.game.canvas.width - 170, 187 + 75 * 2, "+" + this.pFunction3.add, {font: "25px Arial"});

    this.scene.get('teleportGUI').data.events.on('changedata-placingTeleporter', (scene, value) => {
      const placingTeleporter = scene.data.get('placingTeleporter');
      if (placingTeleporter) {
        this.input.on("pointerdown",(pointer: Phaser.Input.Pointer)=>{

        const coordinates = this.getTile(pointer.x, pointer.y);
        const tile = this.board.tiles[coordinates[0]][coordinates[1]];
        if ((placingTeleporter.startsWith('grass') && tile.upperType != Type.Grass) ||
            (placingTeleporter.startsWith('stone') && tile.upperType != Type.Stone) ||
            (placingTeleporter.startsWith('sand') && tile.upperType != Type.Sand)) {
          const notAllowed = this.add.image(coordinates[0]* 128 + 64, coordinates[1]* 128 + 64,'notAllowed');
          notAllowed.setDisplaySize(50, 50);
          setTimeout(() => {
            notAllowed.destroy();
          }, 1500);
        } else {

          const portalType = getPortalTypeWithKey(placingTeleporter);
          const portal =new Portal( this,coordinates[0]* 128 + 64,coordinates[1]* 128 + 64, placingTeleporter, portalType);
          portal.setFromTile(tile);
          portal.originTileType= tile.type

          // if the first teleporter placed .
          if(tile.hasPortal == false){
            tile.portal = portal;
            tile.hasPortal = true;
            this.portals.add(tile.portal);

            //finding the goalTile
            tile.portal.createAnim(this);
            this.assignFunctionToPortalType(tile.portal);
            const goal = tile.portal.whereToGo(this.board, tile.tileNumber, tile.type);
            const tileType = getTileTypeWithKey(placingTeleporter);

            // changing the upperType of the Tile
            tile.upperType = tileType;
            //setting the goalTile
            const goalTile = this.board.findTile(tileType, goal);
            //console.log(goalTile);
            tile.portal.setGoal(goalTile);
            portal.setGoal(goalTile);
            tile.portal.teleporterList.push(portal);

          }
          // teleporter stacking
          else{
            tile.portal.createAnim(this);
            //assign function
            this.assignFunctionToPortalType(portal);
            //finding GoalTile
            const prePortal = tile.portal.teleporterList.pop();
            const id = prePortal.toTile.tileNumber;
            tile.portal.teleporterList.push(prePortal);
            const goal = portal.whereToGo(this.board, id, tile.upperType);
            const tileType = getTileTypeWithKey(placingTeleporter);
            // change the upperTileType for the next teleporter
            tile.upperType = tileType;
            //setting the goalTile
            const goalTile = this.board.findTile(tileType, goal);
            portal.setGoal(goalTile);
            tile.portal.teleporterList.push(portal);
            //console.log(tile.portal.teleporterList);
          }

          this.input.off('pointerdown');

        }


      });
      }
    });

    this.scene.get('teleportGUI').data.events.on('changedata-teleportersActivated', (scene, value) => {
      const teleportersActivated = scene.data.get('teleportersActivated');
      if (teleportersActivated) {
        this.portals.children.each((portal: Portal) =>{

          for (let i = portal.teleporterList.length-1  ; i > 0 ; i--){
            const p= portal.teleporterList[i];
            p.destroy();
            portal.teleporterList.pop();

          }

          portal.chosen = true;
          portal.fromTile.hasPortal = false;
          portal.fromTile.type = portal.originTileType;
          portal.setTexture("portal");
          portal.setSize(128, 128);
          portal.play("Portal2",true);
          portal.on("animationcomplete", ()=>{

            portal.teleporterList.pop();
            portal.destroy();
             })
          //console.log(portal.teleporterList);

        })
      }
    });

    // remove Teleporter

    const keyObject = this.input.keyboard.addKey("BACKSPACE");
    keyObject.on('down',() =>{
        this.input.on("pointerdown",(pointer: Phaser.Input.Pointer) =>{
          const coordinates1 = this.getTile(pointer.x, pointer.y);
          const tile = this.board.tiles[coordinates1[0]][coordinates1[1]];
          if(tile.hasPortal){
            this.sheep.children.each((sheep: Sheep) =>{
              sheep.stop = false ;
            })
            for (let i = tile.portal.teleporterList.length-1  ; i > 0 ; i--){
              const p= tile.portal.teleporterList[i];
              p.destroy();
              tile.portal.teleporterList.pop();

            }
            tile.portal.destroy();
          }

        })
    })




    for (const sheep of this.sheep.getChildren()) {
      sheep.data.events.on('changedata-saved', (scene, value) => {
        this.data.set('playerScore', this.data.get('playerScore') + 1);
      });
    }

    this.sys.events.once('shutdown', this.shutdown, this);
    makeCollider(this, this.sheep, this.fences, this.portals, this.board);
  }

  update(): void {
    //update all sheep
    for (const sheep of this.sheep.getChildren()) {
      sheep.update();
    }
  }

  shutdown(): void {
    if (this.sheep.children){
      this.sheep.children.each((sheep: Sheep) =>{
        sheep.data.events.off('changedata-saved');
      })
    }
  }
}