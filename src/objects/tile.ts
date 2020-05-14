export enum Type {
  Grass,
  Sand,
  Stone
}

export class Tile {
  private _type: Type;
  private _ref: object;
  private _isDestination: boolean;
  
  constructor(typeOfTile: Type) {
    this._type = typeOfTile;
    this._isDestination = false;
  }

  get isDestination(): boolean {
    return this._isDestination;
  }

  set isDestination(value: boolean) {
    this._isDestination = value;
  }

  set ref(value: object) {
    this._ref = value;
  }
  get type(): Type {
    return this._type;
  }
}
