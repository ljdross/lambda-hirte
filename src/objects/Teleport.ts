import "phaser";
import {Tile, Type} from "./tile";
import {Sheep} from "./sheep";
import {Board} from "./board";
import Scene = Phaser.Scene;

export enum portalType {
    gtog ,
    gtosa,
    gtost,
    satosa,
    satog,
    satost,
    sttost,
    sttog,
    sttosa
}


export class Portal extends Phaser.Physics.Arcade.Sprite{

    private context: Phaser.Structs.List<[Tile,Tile]> ;
    ptype: portalType;
    sizeOfTile: number;
    fromTile: Tile;
    toTile: Tile;
    chosen: boolean;

    constructor(scene: Phaser.Scene ,x: number ,y: number, texture: string , ptyp: portalType) {
        super(scene, x, y,texture);
        this.scene.add.existing(this);
        this.setInteractive();
        this.ptype = ptyp;
        this.chosen= false;
    }

    public setGoal(tile: Tile): void{
        this.toTile= tile;
    }

    public createAnim(scene: Phaser.Scene) {

        scene.anims.create({
            key: 'Portal1',
            frames: [{key:'portal' , frame:4}],
            frameRate: 20,
        })

        scene.anims.create({
            key: 'Portal2',
            frames: scene.anims.generateFrameNumbers('portal', {start: 4, end: 0}),
            frameRate: 7,
            yoyo: true,
        })

        scene.anims.create({
            key: 'Portal3',
            frames: scene.anims.generateFrameNumbers('portal', {start: 5, end: 9}),
            frameRate: 7,
            yoyo: true,
        })
    }

    /*
    Getting the goal-tile ID , based on a given function.
    Calculate where to go
    */
    public whereToGo(board: Board, id: number, tileTyp: Type): number{

        if (tileTyp == Type.Grass ){
            if(this.ptype == portalType.gtog) return (id+5) % board.getNumberOfTilesByType(Type.Grass);
            if(this.ptype == portalType.gtosa) return (id+3) % board.getNumberOfTilesByType(Type.Sand);
            if(this.ptype == portalType.gtost) return (id+2) % board.getNumberOfTilesByType(Type.Stone);
        }
        if (tileTyp == Type.Sand ){
            if(this.ptype == portalType.satog) return (id+9)% board.getNumberOfTilesByType(Type.Grass);
            if(this.ptype == portalType.satosa) return (id+3)% board.getNumberOfTilesByType(Type.Sand);
            if(this.ptype == portalType.satost) return (id+2)% board.getNumberOfTilesByType(Type.Stone);
        }
        if (tileTyp == Type.Stone ){
            if(this.ptype == portalType.sttog) return (id+5)% board.getNumberOfTilesByType(Type.Grass);
            if(this.ptype == portalType.sttosa) return (id+3)% board.getNumberOfTilesByType(Type.Sand);
            if(this.ptype == portalType.sttost) return (id+2)% board.getNumberOfTilesByType(Type.Stone);
        }

        return 0 ;
    }

    /*
    Perform the teleport from this portal to the "toTile" portal.
    Conditions:
    must be bind with another portal
    must be chosen
    need a sprites for the side effect
    */
    public executeTeleport ( scene: Scene ,board: Board,s: Sheep): void{
        if(this.toTile != null && this.chosen == true){

           const coord = board.findTileCoord(this.toTile);
            this.toTile.portal = new Portal(scene , coord[0]* 128 + 64 , coord[1]* 128 + 64, "Portal",this.ptype);
            s.x= this.toTile.portal.x;
            s.y= this.toTile.portal.y;
            this.toTile.portal.setDepth(1);
            this.toTile.portal.play("Portal3");
            this.toTile.portal.on("animationcomplete",()=> {
                this.toTile.portal.destroy();
            });
            this.chosen= false;

        }
    }
}