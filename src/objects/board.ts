import {Tile, Type} from "./tile";
import {Portal} from "./Teleport";
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
        this.tiles[x][y] = new Tile(Type.Grass,true);
      }
    }
  }
  
  draw(scene: Phaser.Scene): void{
    this.numberOfTilesByType.length = 0;
    this.numberOfTilesByType[Type.Grass] = 0;
    this.numberOfTilesByType[Type.Sand] = 0;
    this.numberOfTilesByType[Type.Stone] = 0;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.tiles[x][y].type == Type.Grass) {
          this.drawHelper(scene, x, y, Type.Grass);
        } else if (this.tiles[x][y].type == Type.Sand) {
          this.drawHelper(scene, x, y, Type.Sand);
        } else if (this.tiles[x][y].type == Type.Stone) {
          this.drawHelper(scene, x, y, Type.Stone);
        }
      }   
    }
  }

  drawHelper(scene: Phaser.Scene, x: number, y: number, type: Type) {
    // Dependent on Settings, physics with debug (Grid on) or without is activated
    const physics = (this.showGrid) ? (scene.physics) : (scene.matter);

    this.tiles[x][y].image = physics.add.image(x * 128 + 64, y * 128 + 64, Type[type]);
    this.tiles[x][y].tileNumber = this.numberOfTilesByType[type];
    if (this.showTileNumbers) this.tiles[x][y].text = scene.add.text(x * 128 + 64, y * 128 + 64, this.tiles[x][y].tileNumber.toString(), {font: "25px Arial", fill: "black"});
    this.numberOfTilesByType[type]++;
    if (this.tiles[x][y].hasPortal) this.tiles[x][y].portal = new Portal(scene, x * 128 + 64, y * 128 + 64, "portal", "g->g").setVisible(false);
  }

  getNumberOfTilesByType(type: Type): number {
    return this.numberOfTilesByType[type];
  }
}
