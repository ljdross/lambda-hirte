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

    teleporterList: any[];
    ptype: portalType;
    sizeOfTile: number;
    fromTile: Tile;
    toTile: Tile;
    chosen: boolean;
    first: boolean;
    originTileType: Type;
    pFunction = {add: null, multi: null} ;

    constructor(scene: Phaser.Scene ,x: number ,y: number, texture: string , ptyp: portalType) {
        super(scene, x, y,texture);
        this.scene.add.existing(this);
        this.setInteractive();
        this.ptype = ptyp;
        this.chosen= false;
        this.first= false;
        this.teleporterList= [];

    }

    public setGoal(tile: Tile): void{
        this.toTile = tile;
    }
    public setFromTile(tile: Tile): void{
        this.fromTile = tile;
    }

    public  setFunction(x: number,y: number): void {
        this.pFunction.add = x;
        this.pFunction.multi = y;
    }




    public createAnim(scene: Phaser.Scene) {
        scene.anims.create({
            key: 'Portal1',
            frames: [{key:'portal' , frame:4}],
            frameRate: 20,
        })

        scene.anims.create({
            key: "Portal2",
            frames: scene.anims.generateFrameNumbers('portal', {start: 4, end: 0}),
            frameRate: 7,
            //yoyo: true,
        })

        scene.anims.create({
            key: "Portal3",
            frames: scene.anims.generateFrameNumbers('portal', {start: 5, end: 9}),
            frameRate: 7,
            yoyo: true,
            hideOnComplete: true
        })
    }

    /*
    Getting the goal-tile ID , based on a given function.
    Calculate where to go
    */
    public whereToGo(board: Board, id: number, tileTyp: Type): number{


        if (this.pFunction.multi == null || this.pFunction.add == null) return 0;

        else

        return (this.pFunction.multi * id +this.pFunction.add) ;

    }

    /*
    Perform the teleport from this portal to the "toTile" portal.
    Conditions:
    must be bind with another portal
    must be chosen
    need a sprites for the side effect
    */
    public executeTeleport ( scene: Scene ,board: Board,portals: Phaser.GameObjects.Group, sheep: Sheep): void{
        for(let i = 0 ; i< this.teleporterList.length; i++ ){

                const p = this.teleporterList[i];
                this.setGoal(p.toTile);
                if(this.toTile != null  && this.chosen == true) {
                    //console.log("here22");
                    const coord = board.findTileCoord(this.toTile);
                    this.toTile.portal = new Portal(scene, coord[0] * 128 + 64, coord[1] * 128 + 64, "portal", this.ptype);
                    sheep.visible = false;
                    this.toTile.portal.setDepth(1);
                    this.createAnim(scene);
                    this.toTile.portal.play("Portal3", true);
                    this.toTile.portal.on("animationcomplete", () => {
                        sheep.x = this.toTile.portal.x;
                        sheep.y = this.toTile.portal.y;
                        sheep.visible = true;
                        this.toTile.portal.destroy();
                        sheep.stop = false;
                    })
                }



        }




    }
}