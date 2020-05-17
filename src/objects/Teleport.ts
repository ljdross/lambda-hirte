import "phaser";
import {Board, Tile, Type} from "./board";
import List = Phaser.Structs.List;


// eslint-disable-next-line @typescript-eslint/class-name-casing
export abstract class Portal extends Phaser.GameObjects.Sprite{

    private context: Phaser.Structs.List<any> ;

    sizeOfTile: number

    fromTile: [number, number];

    toTile: [number, number];


    protected constructor(scene: Phaser.Scene ,from: [number, number] , to: [number,number],size: number , texture: string ,context: List<any> ) {

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        super(scene, from, to ,texture);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setInteractive();

        this.sizeOfTile = size;

        this.fromTile = from ;

        this.toTile = to ;

        this.context = context;
    }

    public createAnim(scene: Phaser.Scene) {

        const pStart = scene.add.sprite(this.fromTile[0] * 128 + 64 + this.sizeOfTile, this.fromTile[1] * 128 + 64 + this.sizeOfTile, 'portal');
        const pEnd = scene.add.sprite(this.toTile[0] * 128 + 64 + this.sizeOfTile, this.toTile[1] * 128 + 64 + this.sizeOfTile, 'portal');

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

        pStart.play('Portal1');
        pEnd.play('Portal1');

        pStart.setInteractive();
        scene.input.on('pointerdown',()=>{pStart.play('Portal2');
                                                    pEnd.play('Portal3');});
        pEnd.setInteractive();
        scene.input.on('pointerdown',()=> {pEnd.play('Portal3');
                                                    pStart.play('Portal2');});




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