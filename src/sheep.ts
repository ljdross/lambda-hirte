import 'phaser';

export class Sheep extends Phaser.GameObjects.Sprite {

    /*haben verschiedene Geschwindigkeit ((maybe random) im constructor, hat eine Range)
    update Funktion
    legt mehrere Steps zurück auf Tiles(5x5)
    wissen, wo sie sind (Koordinaten), fragt Spielbrett bei Übertreten von Tiles
    wissen, ob vor Hindernis
    hoch-runter oder rechts-links
    animations-frames wechseln
    movement stoppen wenn auf Ziel (muss nicht prüfen ob auf Ziel, kann auch eine Methode sein, die von woanders gecallt wird)
    */

    //axis: 0 vertical, 1 horizontal
    constructor(config, axis: number) {
        if(axis==0) {
            super(config.scene,config.x,config.y,"sheep_vertical");
        } else {
            super(config.scene,config.x,config.y,"sheep_horizontal");
        }
        config.scene.add.existing(this);

        //speed, direction
        this.data.set('axis', axis);
        this.data.set('speed', Phaser.Math.Between(0,50));
        this.data.set('dir', Phaser.Math.RND.pick([1, -1]))
    }

    update(...args): void {
        super.update(...args);

        //change animation frames
        //make steps (speed) on tile
        //random direction change?

        this.move();
        this.obstacle();
        this.overstepped();
        this.onGoal();
    }

    obstacle(): void{
        //if obstacle changeDir()
    }

    onGoal(): void{
        //is on Goal?
        //then stop movement
        //this.anims.pause();
    }

    overstepped(): void {
        //where am i
        //can i walk on
        //else changeDir()
    }
    getAxis(): string {
        if(this.data.get('axis') == 0) {
            return "v"; //vertical
        } else if(this.data.get('axis') == 1) {
            return "h"; //horizontal
        }
        return null;
    }

    getTile() {
        //get Tile from coordinates
    }

    move(): void {
        this.anims.play("sheep", true); //left and right sprites?
        if(this.getAxis() === "v") {
            this.anims.play('sheep_vertical', true);
            this.y += this.data.get('dir') * this.data.get('speed');
        } else if(this.getAxis() === "h") {
            this.anims.play('sheep_horizontal', true);
            this.x += this.data.get('dir') * this.data.get('speed');
        }
    }

    changeDir(): void {
        this.data.set('dir', (-1) * this.data.get('dir'));
    }


}