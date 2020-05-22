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
    origin: boolean;


    constructor(scene: Phaser.Scene ,x: number ,y: number, texture: string , type: string) {

        super(scene, x, y,texture);

        this.scene.add.existing(this);
        this.setInteractive();
        this.type = type;
        this.origin = false;
    }

    public setGoal(tile: Tile): void{
        this.toTile= tile;
        this.origin= true;
    }

    public createAnim(scene: Phaser.Scene) {

        scene.anims.create({
            key: 'Portal1',
            frames: [{key:'portal' , frame:4}],
            frameRate: 20,


        })
        scene.anims.create({
            key: 'Portal2',
            delay: 200,
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

    public executeTeleport(): void {

        //const pos = this.vanish(this.fromTile);

        const goal = this.whereToGo(this.fromTile , this.toTile);

        //this.reappear( );
    }

    /*
    * vanish the sheep from the tile.
    *
    * need a sprites for the side effect.
     */
    public vanish(scene: Phaser.Scene , sheep: Sheep): void{
        //TODO
        if(this.visible == true && this.origin == true){
            sheep.destroy();
        }
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
    /*take the goal calculation and recreate the sheep in the goal position.
    *
    *need a sprites for the side effect .
     */
    public reappear ( scene: Scene ,sheeps: Phaser.GameObjects.Group): void{
        //TODO
        if(this.toTile != null && this.toTile.hasPortal == true && this.visible == true){

            const s = new SheepHorizontal({scene: scene ,x: this.toTile.portal.x, y: this.toTile.portal.y+64});
            s.setScale(0.5,0.5);
            sheeps.add(s);
            this.toTile.portal.setVisible(true);
            this.toTile.portal.setDepth(1);
            this.toTile.portal.play("Portal3");
            this.toTile.portal.on("animationcomplete",()=> {
                this.toTile.portal.setVisible(false);
            });

        }
    }

}