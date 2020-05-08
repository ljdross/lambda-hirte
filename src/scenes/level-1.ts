const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Level1',
};

enum Type {
  Grass,
  Sand,
  Stone
}

class Tile {
  type: Type;
  ref: object;
  isDestination: boolean;

  constructor(typeOfTile: Type) {
    this.type = typeOfTile;
  }
}

class Board {
  width: number;
  height: number;
  frameWidth: number;
  tiles: Tile[][];

  constructor(windthInNmbrOfTiles: number, heightInNmbrOfTiles: number, frameWidthInPixels: number) {
    this.width = windthInNmbrOfTiles;
    this.height = heightInNmbrOfTiles;
    this.frameWidth = frameWidthInPixels;

    this.tiles = [];
    for (let x = 0; x < windthInNmbrOfTiles; x++) {
      this.tiles[x] = [];
      for (let y = 0; y < heightInNmbrOfTiles; y++) {
        this.tiles[x][y] = new Tile(Type.Grass);
      }
    }
  }

  draw(scene: Phaser.Scene): void{
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.tiles[x][y].type == Type.Grass) {
          this.tiles[x][y].ref = scene.add.image(x * 128 + 64 + this.frameWidth, y * 128 + 64 + this.frameWidth, 'grass');
        } else if (this.tiles[x][y].type == Type.Sand) {
          this.tiles[x][y].ref = scene.add.image(x * 128 + 64 + this.frameWidth, y * 128 + 64 + this.frameWidth, 'sand');
        } else if (this.tiles[x][y].type == Type.Stone) {
          this.tiles[x][y].ref = scene.add.image(x * 128 + 64 + this.frameWidth, y * 128 + 64 + this.frameWidth, 'stone');
        }
      }   
    }
  }
}

export class Level1 extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };

  constructor() {
    super(sceneConfig);
  }

  preload(): void {
    this.load.image('grass', 'assets/sprites/grass.png');
    this.load.image('sand', 'assets/sprites/sand.png');
    this.load.image('stone', 'assets/sprites/stone.png');
  }

  create(): void {

    const board = new Board(8, 6, 50);
    board.tiles[2][2] = new Tile(Type.Sand);
    board.draw(this);



    const mainMenu = this.add.text(this.sys.game.canvas.width - 200, 10, `Main Menu`, {fill: '#0f0'});
    mainMenu.setInteractive();
    mainMenu.on('pointerdown', () => {
        this.scene.pause('Level1')
        this.scene.start('MainMenu');
    });

  }

  update(): void {
    // TODO
  }
}
