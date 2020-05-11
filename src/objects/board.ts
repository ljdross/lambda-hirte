import {Tile, Type} from "./tile";
export {Tile, Type}

export class Board {
  width: number;
  height: number;
  frameWidth: number;
  tiles: Tile[][];
  
  constructor(windthInNmbrOfTiles: number, heightInNmbrOfTiles: number, frameWidthInPixels: number) {
    this.width = windthInNmbrOfTiles;
    this.height = heightInNmbrOfTiles;
    this.frameWidth = frameWidthInPixels;
    
    this.tiles = [];
    for (let x = 0; x < windthInNmbrOfTiles; x++) {
      this.tiles[x] = [];
      for (let y = 0; y < heightInNmbrOfTiles; y++) {
        this.tiles[x][y] = new Tile(Type.Grass);
      }
    }
  }
  
  draw(scene: Phaser.Scene): void{
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.tiles[x][y].type == Type.Grass) {
          this.tiles[x][y].ref = scene.add.image(x * 128 + 64 + this.frameWidth, y * 128 + 64 + this.frameWidth, 'grass');
        } else if (this.tiles[x][y].type == Type.Sand) {
          this.tiles[x][y].ref = scene.add.image(x * 128 + 64 + this.frameWidth, y * 128 + 64 + this.frameWidth, 'sand');
        } else if (this.tiles[x][y].type == Type.Stone) {
          this.tiles[x][y].ref = scene.add.image(x * 128 + 64 + this.frameWidth, y * 128 + 64 + this.frameWidth, 'stone');
        }
      }   
    }
  }
}
