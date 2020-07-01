import {Tile, Type} from "./tile";
import {Portal, portalType} from "./Teleport";
import 'phaser';

export {Tile, Type}

export class Board {

  public readonly width: number;
  public readonly height: number;
  public tiles: Tile[][];
  public numberOfTilesByType: number[];
  public showGrid: boolean;
  public showTileNumbers: boolean;

  constructor(widthInTiles: number, heightInTiles: number, showGrid: boolean) {
    this.width = widthInTiles;
    this.height = heightInTiles;
    this.showGrid = showGrid;
    this.showTileNumbers = true;
    this.numberOfTilesByType = [];
    this.tiles = [];

    for (let x = 0; x < widthInTiles; x++) {
      this.tiles[x] = [];
      for (let y = 0; y < heightInTiles; y++) {
        this.tiles[x][y] = new Tile(Type.Grass);
      }
    }
  }
  
  draw(scene: Phaser.Scene): void{
    this.numberOfTilesByType.length = 0;
    this.numberOfTilesByType[Type.Grass] = 0;
    this.numberOfTilesByType[Type.Sand] = 0;
    this.numberOfTilesByType[Type.Stone] = 0;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const currentTile = this.tiles[x][y];
        if (currentTile.type == Type.Grass) {
          this.drawHelper(scene, x, y, Type.Grass);
        } else if (currentTile.type == Type.Sand) {
          this.drawHelper(scene, x, y, Type.Sand);
        } else if (currentTile.type == Type.Stone) {
          this.drawHelper(scene, x, y, Type.Stone);
        }
      }   
    }
  }

  drawHelper(scene: Phaser.Scene, x: number, y: number, type: Type) {
    // Dependent on Settings, physics with debug (Grid on) or without is activated
    const physics = (this.showGrid) ? (scene.physics) : (scene.matter);

    const currentTile = this.tiles[x][y];
    if (currentTile.isDestination) {
      currentTile.image = physics.add.image(x * 128 + 64, y * 128 + 64, 'Target');
    } else {
      currentTile.image = physics.add.image(x * 128 + 64, y * 128 + 64, Type[type]);
    }
    currentTile.tileNumber = this.numberOfTilesByType[type];
    if (this.showTileNumbers) {
      currentTile.text = scene.add.text(x * 128 + 64, y * 128 + 64, currentTile.tileNumber.toString(), {
        font: "25px Arial",
        fill: "black"
      });
      currentTile.text.setOrigin(0.5, 0.5);
    }
    this.numberOfTilesByType[type]++;
    //if (this.tiles[x][y].hasPortal) this.tiles[x][y].portal = new Portal(scene, x * 128 + 64, y * 128 + 64, "portal", portalType.gtog).setVisible(false);
  }

  getNumberOfTilesByType(type: Type): number {
    return this.numberOfTilesByType[type];
  }

  // works for any whole number, even negative numbers
  findTile(type: Type, tileNumber: number): Tile {
    tileNumber %= this.getNumberOfTilesByType(type);
    if (tileNumber < 0) tileNumber += this.getNumberOfTilesByType(type);
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const currentTile = this.tiles[x][y];
        if (currentTile.type == type && currentTile.tileNumber == tileNumber) {
          // console.log('found tile at position: (' + x + ', ' + y + ')');
          return currentTile;
        }
      }
    }
  }

  // give back the coordination of a passed tile.
  public findTileCoord(tile: Tile): number[]{
    const coord = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const currentTile = this.tiles[x][y];
        if (currentTile == tile) {
          // console.log('found tile at position: (' + x + ', ' + y + ')');
          coord[0]= x;
          coord[1]= y;
          return coord;
        }
      }
    }
  }
}
