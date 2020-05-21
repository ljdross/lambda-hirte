import {Tile, Type} from "./tile";
import {Portal} from "./Teleport";
export {Tile, Type}

export class Board {

  public readonly width: number;
  public readonly height: number;
  public tiles: Tile[][];
  public numberOfTilesByType: number[];
  public showGrid: boolean;

  constructor(widthInTiles: number, heightInTiles: number, showGrid: boolean) {
    this.width = widthInTiles;
    this.height = heightInTiles;
    this.showGrid = showGrid;
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
    const physics = (this.showGrid) ? (scene.physics) : (scene.matter);

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.tiles[x][y].type == Type.Grass) {
          this.tiles[x][y].ref = physics.add.image(x * 128 + 64, y * 128 + 64, 'grass');
          this.tiles[x][y].tileNumber = this.numberOfTilesByType[Type.Grass];
          this.numberOfTilesByType[Type.Grass]++;
          if(this.tiles[x][y].hasPortal == true){
            this.tiles[x][y].portal = new Portal(scene,x * 128 + 64 ,y * 128 + 64,'portal','g->g').setVisible(false);
          }
        } else if (this.tiles[x][y].type == Type.Sand) {
          this.tiles[x][y].ref = physics.add.image(x * 128 + 64, y * 128 + 64, 'sand');
          this.tiles[x][y].tileNumber = this.numberOfTilesByType[Type.Sand];
          this.numberOfTilesByType[Type.Sand]++;
          if(this.tiles[x][y].hasPortal == true){
            this.tiles[x][y].portal = new Portal(scene,x * 128 + 64,y * 128 + 64,"portal","g->g").setVisible(false);
          }
        } else if (this.tiles[x][y].type == Type.Stone) {
          this.tiles[x][y].ref = physics.add.image(x * 128 + 64, y * 128 + 64, 'stone');
          this.tiles[x][y].tileNumber = this.numberOfTilesByType[Type.Stone];
          this.numberOfTilesByType[Type.Stone]++;
          if(this.tiles[x][y].hasPortal == true){
            this.tiles[x][y].portal = new Portal(scene,x * 128 + 64,y * 128 + 64  ,"portal","g->g").setVisible(false);
          }
        }
      }   
    }
  }
}
