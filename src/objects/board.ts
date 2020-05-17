import {Tile, Type} from "./tile";
export {Tile, Type}

export class Board {

  private _width: number;
  private _height: number;
  private _frameWidth: number;
  private _tiles: Tile[][];
  private _numberOfTilesByType: number[];

  constructor(widthInNmbrOfTiles: number, heightInNmbrOfTiles: number, frameWidthInPixels: number) {
    this._width = widthInNmbrOfTiles;
    this._height = heightInNmbrOfTiles;
    this._frameWidth = frameWidthInPixels;
    this._numberOfTilesByType = [];

    this._tiles = [];
    for (let x = 0; x < widthInNmbrOfTiles; x++) {
      this._tiles[x] = [];
      for (let y = 0; y < heightInNmbrOfTiles; y++) {
        this._tiles[x][y] = new Tile(Type.Grass);
      }
    }
  }
  
  draw(scene: Phaser.Scene): void{
    this._numberOfTilesByType.length = 0;
    this._numberOfTilesByType[Type.Grass] = 0;
    this._numberOfTilesByType[Type.Sand] = 0;
    this._numberOfTilesByType[Type.Stone] = 0;
    for (let x = 0; x < this._width; x++) {
      for (let y = 0; y < this._height; y++) {
        if (this._tiles[x][y].type == Type.Grass) {
          this._tiles[x][y].ref = scene.add.image(x * 128 + 64 + this._frameWidth, y * 128 + 64 + this._frameWidth, 'grass');
          this._numberOfTilesByType[Type.Grass]++;
        } else if (this._tiles[x][y].type == Type.Sand) {
          this._tiles[x][y].ref = scene.add.image(x * 128 + 64 + this._frameWidth, y * 128 + 64 + this._frameWidth, 'sand');
          this._numberOfTilesByType[Type.Sand]++;
        } else if (this._tiles[x][y].type == Type.Stone) {
          this._tiles[x][y].ref = scene.add.image(x * 128 + 64 + this._frameWidth, y * 128 + 64 + this._frameWidth, 'stone');
          this._numberOfTilesByType[Type.Stone]++;
        }
      }   
    }
  }

  get tiles(): Tile[][] {
    return this._tiles;
  }

  
  get numberOfTilesByType(): number[] {
    return this._numberOfTilesByType;
  }
  

}
