import {Portal} from "./Teleport";
import 'phaser';

export enum Type {
  Grass,
  Sand,
  Stone
}

export class Tile {
  public type: Type;
  public image: object; // should be type Phaser.Physics.Arcade.Image maybe?
  public text: object; //maybe also not object but a different type
  public tileNumber: number;
  public isDestination: boolean;
  public teleporterList: object; //should actually be private _teleporterList: Teleporter[];
  public hasPortal: boolean;
  public portal: Portal;
  
  constructor(typeOfTile: Type, hasPortal=false) {
    this.type = typeOfTile;
    this.isDestination = false;
    this.teleporterList = [];
    this.hasPortal = hasPortal;
  }
}
