import {Portal} from "./Teleport";
import 'phaser';

export enum Type {
  Grass,
  Sand,
  Stone
}

export class Tile {
  public type: Type;
  public image: Phaser.GameObjects.Image;
  public text: Phaser.GameObjects.Text;
  public tileNumber: number;
  public isDestination: boolean;
  public teleporterList: any[]; //should actually be teleporterList: Teleporter[];
  public hasPortal: boolean;
  public portal: Portal;
  
  constructor(typeOfTile: Type, hasPortal=false) {
    this.type = typeOfTile;
    this.isDestination = false;
    this.teleporterList = [];
    this.hasPortal = hasPortal;
  }
}
