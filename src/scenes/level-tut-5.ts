import {Tile, Type, Board} from "../objects/board"
import{Portal,portalType} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {getTileTypeWithKey, initSettings, getPortalTypeWithKey, makeCollider} from "../util/functions";
import {Fence} from "../objects/fence";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'LevelTut5',
    physics: physicsSettings
};

export class LevelTut5 extends Phaser.Scene {


    public sheep: Phaser.GameObjects.Group; //List of all Sheep
    public fences: Phaser.GameObjects.Group; // List of all fences
    public board: Board;
    public showGrid: boolean;
    public musicVolume: number;
    public brightness: number;
    public portals: Phaser.GameObjects.Group;
    public pFunction1 = {add: 0 , multi: 1/2};
    public pFunction2 = {add: 4 , multi: 1};
    public pFunction3 = {add: 9 , multi: 1};
    public pFunction4 = {add: -2 , multi: 1};

    constructor() {
        super(sceneConfig);
    }

    init(data): void {
        this.data.set('playerScore', 0);
        this.data.set('playerWinningScore', 1); // MUST be 1?? it seems to be more likely to crash when it's not
        initSettings(this, data);
    }

    public assignFunctionToPortalType(portal: Portal): void{

        if(portal.ptype == portalType.sttost)  portal.setFunction(this.pFunction1.add, this.pFunction1.multi);
        if(portal.ptype == portalType.sttosa)  portal.setFunction(this.pFunction2.add, this.pFunction2.multi);
        if(portal.ptype == portalType.satog)  portal.setFunction(this.pFunction3.add, this.pFunction3.multi);
        if(portal.ptype == portalType.gtost)  portal.setFunction(this.pFunction4.add, this.pFunction4.multi);
    }
    // give back the tile with the coordinate(x,y)
    public getTile( x: number, y: number): number[] {
        const coordinates = [];
        const column = Math.floor(x / 128);
        coordinates[0] = column;
        if (this.board.tiles[column] != null) {
            const row = Math.floor(y / 128);
            coordinates[1] = row
            return coordinates;
        }
        return null
    }

    create(): void {
        this.board = new Board(8, 8, this.showGrid);

        // creating sand tiles
        for (let x = 0; x < 8; x++) {
            this.board.tiles[x][3] = new Tile(Type.Sand);
        }
        for (let y = 0; y < 8; y++) {
            this.board.tiles[4][y] = new Tile(Type.Sand);
        }

        // creating stone tiles
        for (let x = 0; x < 8; x++) {
            this.board.tiles[x][7 - x] = new Tile(Type.Stone);
        }
        this.board.tiles[0][0] = new Tile(Type.Stone);
        this.board.tiles[1][1] = new Tile(Type.Stone);
        this.board.tiles[2][2] = new Tile(Type.Stone);

        this.board.tiles[5][4] = new Tile(Type.Stone);
        this.board.tiles[6][5] = new Tile(Type.Stone);
        this.board.tiles[7][6] = new Tile(Type.Stone);

        // creating grass tile for destination
        this.board.tiles[4][3] = new Tile(Type.Grass);

        this.board.tiles[4][3].isDestination = true;
        this.board.draw(this);
        this.sheep = this.add.group();
        this.fences = this.add.group();
        this.portals= this.physics.add.group();

        const sheep1 = new SheepHorizontal({scene: this, x: Phaser.Math.Between(7 * 128 + 50, 7 * 128 + 92), y: Phaser.Math.Between(7 * 128 + 50, 7 * 128 + 78)});
        this.sheep.addMultiple([sheep1]);

        // creating fences
        const fh11 = new Fence(this, 1.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
        const fh12 = new Fence(this, 2.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
        const fh13 = new Fence(this, 3.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
        const fh14 = new Fence(this, 4.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
        const fh15 = new Fence(this, 5.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);
        const fh16 = new Fence(this, 6.5 * 128, 128 * 1, 'fence_h').setOrigin(0.5, 0.5);

        const fh21 = new Fence(this, 2.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);
        const fh22 = new Fence(this, 3.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);
        const fh23 = new Fence(this, 4.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);
        const fh24 = new Fence(this, 5.5 * 128, 128 * 2, 'fence_h').setOrigin(0.5, 0.5);

        const fh31 = new Fence(this, 3.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);
        const fh32 = new Fence(this, 4.5 * 128, 128 * 3, 'fence_h').setOrigin(0.5, 0.5);

        const fh41 = new Fence(this, 3.5 * 128, 128 * 5, 'fence_h').setOrigin(0.5, 0.5);
        const fh42 = new Fence(this, 4.5 * 128, 128 * 5, 'fence_h').setOrigin(0.5, 0.5);
        const fh43 = new Fence(this, 5.5 * 128, 128 * 5, 'fence_h').setOrigin(0.5, 0.5);

        const fh51 = new Fence(this, 2.5 * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);
        const fh52 = new Fence(this, 3.5 * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);
        const fh53 = new Fence(this, 4.5 * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);
        const fh54 = new Fence(this, 5.5 * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);
        const fh55 = new Fence(this, 6.5 * 128, 128 * 6, 'fence_h').setOrigin(0.5, 0.5);

        const fh61 = new Fence(this, 1.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh62 = new Fence(this, 2.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh63 = new Fence(this, 3.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh64 = new Fence(this, 4.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh65 = new Fence(this, 5.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh66 = new Fence(this, 6.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);
        const fh67 = new Fence(this, 7.5 * 128, 128 * 7, 'fence_h').setOrigin(0.5, 0.5);

        const fv11 = new Fence(this, 1 * 128, 128 * 1.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv12 = new Fence(this, 1 * 128, 128 * 2.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv13 = new Fence(this, 1 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv14 = new Fence(this, 1 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv15 = new Fence(this, 1 * 128, 128 * 5.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv16 = new Fence(this, 1 * 128, 128 * 6.5, 'fence_v').setOrigin(0.5, 0.5);

        const fv21 = new Fence(this, 2 * 128, 128 * 2.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv22 = new Fence(this, 2 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv23 = new Fence(this, 2 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv24 = new Fence(this, 2 * 128, 128 * 5.5, 'fence_v').setOrigin(0.5, 0.5);

        const fv31 = new Fence(this, 3 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv32 = new Fence(this, 3 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);

        const fv41 = new Fence(this, 5 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);

        const fv51 = new Fence(this, 6 * 128, 128 * 2.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv52 = new Fence(this, 6 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv53 = new Fence(this, 6 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);

        const fv61 = new Fence(this, 7 * 128, 128 * 1.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv62 = new Fence(this, 7 * 128, 128 * 2.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv63 = new Fence(this, 7 * 128, 128 * 3.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv64 = new Fence(this, 7 * 128, 128 * 4.5, 'fence_v').setOrigin(0.5, 0.5);
        const fv65 = new Fence(this, 7 * 128, 128 * 5.5, 'fence_v').setOrigin(0.5, 0.5);

        this.fences.addMultiple([fh11,fh12,fh13,fh14,fh15,fh16,fh21,fh22,fh23,fh24,fh31,fh32,fh41,fh42,fh43,fh51,fh52,fh53,fh54,fh55,fh61,fh62,fh63,fh64,fh65,fh66,fh67]);
        this.fences.addMultiple([fv11,fv12,fv13,fv14,fv15,fv16,fv21,fv22,fv23,fv24,fv31,fv32,fv41,fv51,fv52,fv53,fv61,fv62,fv63,fv64,fv65]);

        // text to display function value
        this.add.text(this.sys.game.canvas.width - 185, 187, "*" + this.pFunction1.multi, {font: "25px Arial"});
        this.add.text(this.sys.game.canvas.width - 170, 187 + 75, "+" + this.pFunction2.add, {font: "25px Arial"});
        this.add.text(this.sys.game.canvas.width - 170, 187 + 75 * 2, "+" + this.pFunction3.add, {font: "25px Arial"});
        this.add.text(this.sys.game.canvas.width - 170, 187 + 75 * 3, "" + this.pFunction4.add, {font: "25px Arial"});

        this.scene.get('teleportGUI').data.events.on('changedata-placingTeleporter', (scene, value) => {
            const placingTeleporter = scene.data.get('placingTeleporter');
            if (placingTeleporter) {
                this.input.on("pointerdown",(pointer: Phaser.Input.Pointer)=>{

                    const coordinates = this.getTile(pointer.x, pointer.y);
                    const tile = this.board.tiles[coordinates[0]][coordinates[1]];
                    if ((placingTeleporter.startsWith('grass') && tile.upperType != Type.Grass) ||
                        (placingTeleporter.startsWith('stone') && tile.upperType != Type.Stone) ||
                        (placingTeleporter.startsWith('sand') && tile.upperType != Type.Sand)) {
                        const notAllowed = this.add.image(coordinates[0]* 128 + 64, coordinates[1]* 128 + 64,'notAllowed');
                        notAllowed.setDisplaySize(50, 50);
                        setTimeout(() => {
                            notAllowed.destroy();
                        }, 1500);
                    } else {
                        const portalType = getPortalTypeWithKey(placingTeleporter);
                        const portal =new Portal( this,coordinates[0]* 128 + 64,coordinates[1]* 128 + 64, placingTeleporter, portalType);
                        portal.setFromTile(tile);
                        portal.originTileType= tile.type

                        // if the first teleporter placed .
                        if(tile.hasPortal == false){
                            tile.portal = portal;
                            tile.hasPortal = true;
                            this.portals.add(tile.portal);

                            //finding the goalTile
                            tile.portal.createAnim(this);
                            this.assignFunctionToPortalType(tile.portal);
                            const goal = tile.portal.whereToGo(this.board, tile.tileNumber, tile.type);
                            const tileType = getTileTypeWithKey(placingTeleporter);

                            // changing the upperType of the Tile
                            tile.upperType = tileType;
                            //setting the goalTile
                            const goalTile = this.board.findTile(tileType, goal);
                            //console.log(goalTile);
                            tile.portal.setGoal(goalTile);
                            portal.setGoal(goalTile);
                            tile.portal.teleporterList.push(portal);

                        }
                        // teleporter stacking
                        else{
                            tile.portal.createAnim(this);
                            //assign function
                            this.assignFunctionToPortalType(portal);
                            //finding GoalTile
                            const prePortal = tile.portal.teleporterList.pop();
                            const id = prePortal.toTile.tileNumber;
                            tile.portal.teleporterList.push(prePortal);
                            const goal = portal.whereToGo(this.board, id, tile.upperType);
                            const tileType = getTileTypeWithKey(placingTeleporter);
                            // change the upperTileType for the next teleporter
                            tile.upperType = tileType;
                            //setting the goalTile
                            const goalTile = this.board.findTile(tileType, goal);
                            portal.setGoal(goalTile);
                            tile.portal.teleporterList.push(portal);
                            //console.log(tile.portal.teleporterList);
                        }

                        this.input.off('pointerdown');

                    }
                });
            }
        });

        this.scene.get('teleportGUI').data.events.on('changedata-teleportersActivated', (scene, value) => {
            const teleportersActivated = scene.data.get('teleportersActivated');
            if (teleportersActivated) {
                this.portals.children.each((portal: Portal) =>{
                    //destroy all the stacked teleporters and pop them from the lest

                    //setting back the origin attributs of the tile and play the anim.
                    portal.chosen = true;
                    portal.fromTile.hasPortal = false;
                    //portal.fromTile.type = portal.originTileType;
                    portal.setTexture("portal");
                    portal.setSize(128, 128);
                    portal.play("Portal2",true);
                    portal.on("animationcomplete", ()=>{

                        portal.teleporterList.pop();
                        portal.fromTile.upperType = portal.originTileType;


                        portal.destroy();
                    })
                    for (let i = portal.teleporterList.length-1  ; i > 0 ; i--){
                        const p= portal.teleporterList[i];
                        p.destroy();
                        portal.teleporterList.pop();

                    }

                })
            }
        });

        //setting the remove key
        const keyObject = this.input.keyboard.addKey("BACKSPACE");
        keyObject.on('down',() =>{
            this.input.on("pointerdown",(pointer: Phaser.Input.Pointer) =>{
                const coordinates1 = this.getTile(pointer.x, pointer.y);
                const tile = this.board.tiles[coordinates1[0]][coordinates1[1]];
                if(tile.hasPortal){
                    this.sheep.children.each((sheep: Sheep) =>{
                        sheep.stop = false ;
                    })
                    for (let i = tile.portal.teleporterList.length-1  ; i > 0 ; i--){
                        const p= tile.portal.teleporterList[i];
                        p.destroy();
                        tile.portal.teleporterList.pop();

                    }
                    tile.portal.destroy();
                }
            })
        })

        for (const sheep of this.sheep.getChildren()) {
            sheep.data.events.on('changedata-saved', (scene, value) => {
                this.data.set('playerScore', this.data.get('playerScore') + 1);
            });
        }
        this.sys.events.once('shutdown', this.shutdown, this);

        this.physics.world.addCollider(this.sheep, this.sheep, (sheep1: Sheep, sheep2: Sheep) => {
            sheep1.collide(sheep2);
            sheep2.collide(sheep1);
        })

        this.physics.world.addCollider(this.fences, this.sheep, (fences: Fence, sheep: Sheep) => {
            sheep.collide(fences);
        })
        this.physics.world.addCollider(this.sheep, this.portals, (sheep: Sheep, portal: Portal)=> {
            portal.executeTeleport(this ,this.board, this.portals, sheep);
            sheep.collide(portal);

        })
    }

    update(): void {
        //update all sheep
        for(const s of this.sheep.getChildren()) {
            s.update();
        }
    }
    shutdown(): void {
        if (this.sheep.children){
            this.sheep.children.each((sheep: Sheep) =>{
                sheep.data.events.off('changedata-saved');
            })
        }
    }
}
