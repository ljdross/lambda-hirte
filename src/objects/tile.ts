export enum Type {
  Grass,
  Sand,
  Stone
}

export class Tile {
  private _type: Type;
  private _ref: object;
  private _tileNumber: number;
  private _isDestination: boolean;
  private _teleporterList: object; //should actually be private _teleporterList: Teleporter[];
  
  constructor(typeOfTile: Type) {
    this._type = typeOfTile;
    this._isDestination = false;
    this._teleporterList = [];
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

  
  set tileNumber(v: number) {
    this._tileNumber = v;
  }
  get tileNumber(): number {
    return this._tileNumber;
  }

  
  set teleporterList(v: object) {
    this._teleporterList = v;
  }
  get teleporterList(): object {
    return this._teleporterList;
  }
  
  
}
