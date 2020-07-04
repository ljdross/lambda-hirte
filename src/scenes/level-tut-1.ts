import {Tile, Type, Board} from "../objects/board"
import{Portal,portalType} from "../objects/Teleport";
import {Sheep,SheepHorizontal, SheepVertical} from "../objects/sheep";
import {physicsSettings} from "../util/data";
import {getTileTypeWithKey, initSettings, getPortalTypeWithKey, makeCollider} from "../util/functions";
import {Fence} from "../objects/fence";


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'LevelTut1',
    physics: physicsSettings
};

export class LevelTut1 extends Phaser.Scene {


    public sheep: Phaser.GameObjects.Group; //List of all Sheep
    public board: Board;
    public showGrid: boolean;
    public musicVolume: number;
    public brightness: number;
    public portals: Phaser.GameObjects.Group;
    public pFunction1 = {add: 7 , multi: 1};

    constructor() {
        super(sceneConfig);
    }

    init(data): void {
        this.data.set('playerScore', 0);
        this.data.set('playerWinningScore', 1); // MUST be 1?? it seems to be more likely to crash when it's not
        initSettings(this, data);
    }

    public assignFunctionToPortalType(portal: Portal): void{

        if(portal.ptype == portalType.gtog)  portal.setFunction(this.pFunction1.add, this.pFunction1.multi);


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
        this.board = new Board(7, 6, this.showGrid);

        this.board.tiles[6][5].isDestination = true;
        this.board.draw(this);
        this.sheep = this.physics.add.group();
        this.portals= this.physics.add.group();

        const sheep1 = new SheepHorizontal({scene: this, x: Phaser.Math.Between(50, 92), y: Phaser.Math.Between(50, 78)});
        this.sheep.addMultiple([sheep1]);

        // text to display function value
        this.add.text(this.sys.game.canvas.width - 170, 187, "+" + this.pFunction1.add, {font: "25px Arial"});

        this.scene.get('teleportGUI').data.events.on('changedata-placingTeleporter', (scene, value) => {
            const placingTeleporter = scene.data.get('placingTeleporter');
            if (placingTeleporter) {
                this.input.on("pointerdown",(pointer: Phaser.Input.Pointer)=>{

                    const coordinates = this.getTile(pointer.x, pointer.y);
                    const tile = this.board.tiles[coordinates[0]][coordinates[1]];
                    if ((placingTeleporter.startsWith('grass') && tile.type != Type.Grass) ||
                        (placingTeleporter.startsWith('stone') && tile.type != Type.Stone) ||
                        (placingTeleporter.startsWith('sand') && tile.type != Type.Sand)) {
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
                    for (let i = portal.teleporterList.length-1  ; i > 0 ; i--){
                        const p= portal.teleporterList[i];
                        p.destroy();
                        portal.teleporterList.pop();

                    }
                    //setting back the origin attributs of the tile and play the anim.
                    portal.chosen = true;
                    portal.fromTile.hasPortal = false;
                    portal.fromTile.type = portal.originTileType;
                    portal.setTexture("portal");
                    portal.setSize(128, 128);
                    portal.play("Portal2",true);
                    portal.on("animationcomplete", ()=>{

                        portal.teleporterList.pop();
                        portal.destroy();
                    })

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
