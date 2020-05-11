export enum Type {
  Grass,
  Sand,
  Stone
}

export class Tile {
  type: Type;
  ref: object;
  isDestination: boolean;
  
  constructor(typeOfTile: Type) {
    this.type = typeOfTile;
    this.isDestination = false;
  }
}
