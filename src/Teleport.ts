import "phaser";
//import {playboard} from "./playboard";
//import {tile} from "./tile";
import List = Phaser.Structs.List;


// eslint-disable-next-line @typescript-eslint/class-name-casing
export abstract class teleport extends Phaser.GameObjects.Sprite{

    private context: Phaser.Structs.List<any> ;

    fromTile: any;

    toTile: any;


    protected constructor(scene: Phaser.Scene ,from: number , to: number, texture: string ,context: List<any> ) {
        super(scene, from, to ,texture);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);


        this.fromTile = from ;

        this.toTile = to ;

        this.context = context;
    }


    public executeTeleport(): void {

        const pos = this.vanish(this.fromTile);

        const goal = this.whereToGo(this.fromTile , this.toTile);

        this.reappear( goal);
    }

    /*
    * vanish the sheep from the tile.
    *
    * need a sprites for the side effect.
     */
    public vanish(tileID: any): any{
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