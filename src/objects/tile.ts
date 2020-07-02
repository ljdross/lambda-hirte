import {Portal} from "./Teleport";
import 'phaser';

export enum Type {
  Grass,
  Sand,
  Stone
}

export class Tile {
  public type: Type;
  public upperType: Type;
  public image: Phaser.GameObjects.Image;
  public text: Phaser.GameObjects.Text;
  public tileNumber: number;
  public isDestination: boolean;
   //should actually be teleporterList: Teleporter[];
  public hasPortal: boolean;
  public portal: Portal;
  
  constructor(typeOfTile: Type, hasPortal=false) {
    this.type = typeOfTile;
    this.upperType= typeOfTile;
    this.isDestination = false;
    this.hasPortal = hasPortal;
  }
}
