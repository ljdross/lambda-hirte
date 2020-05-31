import "phaser";
import {Board} from "./board";
import {Tile,Type} from "./tile";
import {Sheep, SheepHorizontal} from "./sheep";
import List = Phaser.Structs.List;
import Scene = Phaser.Scene;



export class Portal extends Phaser.Physics.Arcade.Sprite{

    private context: Phaser.Structs.List<[Tile,Tile]> ;
    type: string;
    sizeOfTile: number;
    fromTile: Tile;
    toTile: Tile;
    chosen: boolean;


    constructor(scene: Phaser.Scene ,x: number ,y: number, texture: string , type: string) {

        super(scene, x, y,texture);

        this.scene.add.existing(this);
        this.setInteractive();
        this.type = type;
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
    *look at the context witch typ the tile has
    *
    * and calculate where to go
    *
     */
    public whereToGo(tileID: any, tileID1: any): any{
        //TODO
    }

    /*perform the teleport from this portal to the "toTile" portal.
    *conditions:
    * must be bind with another portal.
    * must be Active (visible).
    *must be chosen .
    * //
    *need a sprites for the side effect .
     */
    public executeTeleport ( scene: Scene ,s: Sheep): void{
        //TODO
        if(this.toTile != null && this.toTile.hasPortal == true && this.visible == true && this.chosen == true){

            s.x= this.toTile.portal.x;
            s.y= this.toTile.portal.y;
            this.toTile.portal.setVisible(true);
            this.toTile.portal.setDepth(1);
            this.toTile.portal.play("Portal3");
            this.toTile.portal.on("animationcomplete",()=> {
                this.toTile.portal.setVisible(false);
            });
            this.chosen= false;

        }
    }

}