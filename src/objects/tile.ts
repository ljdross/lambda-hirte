import {Portal} from "./Teleport";

export enum Type {
  Grass,
  Sand,
  Stone
}

export class Tile {
  private _type: Type;
  private _ref: object;
  private _isDestination: boolean;
  private _hasPortal: boolean;
  private _portal: Portal;
  
  constructor(typeOfTile: Type, hasPortal=false) {
    this._type = typeOfTile;
    this._isDestination = false;
    this._hasPortal = hasPortal;
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
  get hasPortal(): boolean {
    return this._hasPortal;
  }

  set hasPortal(value: boolean) {
    this._hasPortal = value;
  }
  get portal(): Portal {
    return this._portal;
  }

  set portal(value: Portal) {
    this._portal = value;
  }
}
