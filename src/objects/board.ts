import {Tile, Type} from "./tile";
import {Portal} from "./Teleport";
export {Tile, Type}

export class Board {

  private width: number;
  private height: number;
  private frameWidth: number;
  public tiles: Tile[][];
  public numberOfTilesByType: number[];
  public showGrid: boolean;

  constructor(widthInNmbrOfTiles: number, heightInNmbrOfTiles: number, frameWidthInPixels: number) {
    this.width = widthInNmbrOfTiles;
    this.height = heightInNmbrOfTiles;
    this.frameWidth = frameWidthInPixels;
    this.numberOfTilesByType = [];

    this.tiles = [];
    for (let x = 0; x < widthInNmbrOfTiles; x++) {
      this.tiles[x] = [];
      for (let y = 0; y < heightInNmbrOfTiles; y++) {
        this.tiles[x][y] = new Tile(Type.Grass);
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
          this.tiles[x][y].ref = scene.physics.add.image(x * 128 + 64 + this.frameWidth, y * 128 + 64 + this.frameWidth, 'grass');
          this.tiles[x][y].tileNumber = this.numberOfTilesByType[Type.Grass];
          this.numberOfTilesByType[Type.Grass]++;
          if(this.tiles[x][y].hasPortal == true){
            this.tiles[x][y].portal = new Portal(scene,x * 128 + 64 + this.frameWidth,y * 128 + 64 + this.frameWidth,"portal","g->g").setVisible(false);
          }
        } else if (this.tiles[x][y].type == Type.Sand) {
          this.tiles[x][y].ref = scene.physics.add.image(x * 128 + 64 + this.frameWidth, y * 128 + 64 + this.frameWidth, 'sand');
          this.tiles[x][y].tileNumber = this.numberOfTilesByType[Type.Sand];
          this.numberOfTilesByType[Type.Sand]++;
          if(this.tiles[x][y].hasPortal == true){
            this.tiles[x][y].portal = new Portal(scene,x * 128 + 64 + this.frameWidth,y * 128 + 64 + this.frameWidth,"portal","g->g").setVisible(false);
          }
        } else if (this.tiles[x][y].type == Type.Stone) {
          this.tiles[x][y].ref = scene.physics.add.image(x * 128 + 64 + this.frameWidth, y * 128 + 64 + this.frameWidth, 'stone');
          this.tiles[x][y].tileNumber = this.numberOfTilesByType[Type.Stone];
          this.numberOfTilesByType[Type.Stone]++;
          if(this.tiles[x][y].hasPortal == true){
            this.tiles[x][y].portal = new Portal(scene,x * 128 + 64 + this.frameWidth,y * 128 + 64 + this.frameWidth,"portal","g->g").setVisible(false);
          }
        }
      }   
    }
  }

  getTiles(): Tile[][] {
    return this.tiles;
  }

// Dies ist ein Array und kann von ausserhalb zB so aufgerufen werden:
// this._board.numberOfTilesByType[Type.Grass]
// Dies wuerde die Anzahl an Tiles vom Typ Grass ausgeben.
  getNumberOfTilesByType(): number[] {
    return this.numberOfTilesByType;
  }
}
