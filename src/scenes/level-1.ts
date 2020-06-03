import {Board, Tile, Type} from "../objects/board"
import {Portal, portalType} from "../objects/Teleport";
import {Sheep, SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {initSettings} from "../util/functions";
import {Fence} from "../objects/fence";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Level1',
  physics: physicsSettings
};

export class Level1 extends Phaser.Scene {
  public sheep: Phaser.GameObjects.Group; //List of all Sheep
  public fences: Phaser.GameObjects.Group; // List of all fences
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
    const coordinates = [];
    const column = Math.floor(x / 128);
    coordinates[0]=column;
    if(this.board.tiles[column] != null) {
      const row = Math.floor(y / 128);
      coordinates[1]=row
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
    this.physics.world.addCollider(this.portals, this.sheep, (sheep: Sheep, portal: Portal) => {
      portal.executeTeleport(this, this.board, sheep);
    })

    let i: number;
    for(i = 0; i < 5; i++) {
      const sheep1=new SheepHorizontal({scene: this, x: Phaser.Math.Between(50, 206), y: Phaser.Math.Between(30, 206)});
      const sheep2=new SheepVertical({scene: this, x: Phaser.Math.Between(50, 206), y: Phaser.Math.Between(30, 206)});
      this.sheep.addMultiple([sheep1, sheep2]);
    }

    this.physics.world.addCollider(this.sheep, this.sheep, (sheep1: Sheep, sheep2: Sheep) => {
      sheep1.collide(sheep2);
      sheep2.collide(sheep1);
    })

    //fancy fences
    const f1 = new Fence(this, 2 * 128, 128 * 0.5, 'fence_v').setOrigin(0.5, 0.5);
    const f2 = new Fence(this, 2 * 128, 128 * 1.5, 'fence_v').setOrigin(0.5, 0.5);
    const f3 = new Fence(this, 0.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);
    const f4 = new Fence(this, 1.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);

    this.fences = this.add.group();
    this.fences.addMultiple([f1, f2, f3, f4]);
    this.physics.world.addCollider(this.fences, this.sheep, (fences: Fence, sheep: Sheep) => {
      sheep.collide(fences);
    })

    this.scene.get('teleportGUI').data.events.on('changedata-placingTeleporter', (scene, value) => {
      const placingTeleporter = scene.data.get('placingTeleporter');
      this.input.on("pointerdown",(pointer: Phaser.Input.Pointer)=>{
        const coordinates = this.getTile(pointer.x, pointer.y);
        const tile = this.board.tiles[coordinates[0]][coordinates[1]];
        if ((placingTeleporter.startsWith('grass') && tile.type != Type.Grass) ||
            (placingTeleporter.startsWith('stone') && tile.type != Type.Stone) ||
            (placingTeleporter.startsWith('sand') && tile.type != Type.Sand)) {
          const notAllowed = this.add.image(coordinates[0]* 128 + 64, coordinates[1]* 128 + 64,'notAllowed');
          notAllowed.setDisplaySize(50, 50);
          setTimeout(() => {
            notAllowed.destroy();
          }, 1500);
        } else {
          tile.portal = new Portal( this,coordinates[0]* 128 + 64,coordinates[1]* 128 + 64, placingTeleporter, portalType.gtosa);
          tile.portal.createAnim(this);
          const goal = tile.portal.whereToGo(this.board, tile.tileNumber, tile.type);
          tile.portal.setGoal(this.board.findTile(Type.Sand, goal));
          this.portals.add(tile.portal);
          this.input.off('pointerdown');
        }
      });
    });

    this.scene.get('teleportGUI').data.events.on('changedata-teleportersActivated', (scene, value) => {
      const teleportersActivated = scene.data.get('teleportersActivated');
      if (teleportersActivated) {
        this.portals.children.each((portal: Portal) =>{
             portal.chosen = true;
             portal.setTexture("portal");
             portal.setSize(128, 128);
             portal.play("Portal2");
             portal.on("animationcomplete",()=>{
               portal.destroy();
             })
        })
      }
    });
  }

  update(): void {
    //update all sheep
    for(const sheep of this.sheep.getChildren()) {
      sheep.update();
    }
  }
}
