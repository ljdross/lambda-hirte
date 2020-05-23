import "phaser";
import {Board} from "./board";
import {Tile,Type} from "./tile";
import {Sheep} from "./sheep";
import List = Phaser.Structs.List;



export class Portal extends Phaser.Physics.Arcade.Sprite{

    private context: Phaser.Structs.List<[Tile,Tile]> ;
    type: string;
    sizeOfTile: number;
    fromTile: Tile;
    toTile: Tile;


    constructor(scene: Phaser.Scene ,x: number ,y: number, texture: string , type: string) {

        super(scene, x, y,texture);

        this.scene.add.existing(this);
        this.setInteractive();
        this.type = type
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

        this.reappear( goal);
    }

    /*
    * vanish the sheep from the tile.
    *
    * need a sprites for the side effect.
     */
    public vanish(scene: Phaser.Scene , sheep: Sheep): any{
        //TODO

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
    public reappear ( goal: any): void{
        //TODO

    }

}