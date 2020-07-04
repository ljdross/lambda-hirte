import {Type} from "../objects/tile";
import {Portal, portalType} from "../objects/Teleport";
import {Fence} from "../objects/fence";
import Scene = Phaser.Scene;
import {Sheep} from "../objects/sheep";
import {Board} from "../objects/board";

export function initButton(name): void {
    name.setInteractive(({ useHandCursor: true }));
    name.on('pointerover', () => {
        name.setTintFill(0xAEFFFD);
    });
    name.on('pointerout', () => {
        name.setTintFill(0xFFFFFF);
    });
}

export const initLevelButton = ((currentScene, name, width, height, settingsData, level): void => {
    name.setDisplaySize(0.05   * width, 0.1 * height);
    name.setInteractive(({ useHandCursor: true }));
    name.on('pointerdown', () => {
        currentScene.scene.stop('MainMenu');
        if(level == "level1") {
            currentScene.scene.start('Gui', {
                currentLevel: 'LevelTut1',
                winningScore: 1,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('LevelTut1', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToGrass']});
        }
        else if(level == "level2") {
            currentScene.scene.start('Gui', {
                currentLevel: 'LevelTut2',
                winningScore: 1,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('LevelTut2', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToGrass']});
        }
        else if(level == "level3") {
            currentScene.scene.start('Gui', {
                currentLevel: 'LevelTut3',
                winningScore: 2,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('LevelTut3', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToGrass']});
        }
        else if(level == "level4") {
            currentScene.scene.start('Gui', {
                currentLevel: 'LevelTut4',
                winningScore: 2,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('LevelTut4', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToSand', 'sandToStone','sandToGrass']});
        }
        else if(level == "level5") {
            currentScene.scene.start('Gui', {
                currentLevel: 'LevelTut5',
                winningScore: 1,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('LevelTut5', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['stoneToStone', 'stoneToSand', 'sandToGrass','grassToStone']});
        }
        else if(level == "level7") {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level7',
                winningScore: 8,
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level7', {
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToSand', 'sandToGrass', 'sandToStone']});
        }
        else if(level == "level8") {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level8',
                winningScore: 3,
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level8', {
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToGrass']});
        }
        else if(level == "level9") {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level9',
                winningScore: 5,
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level9', {
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToGrass', 'sandToStone', 'stoneToGrass', 'grassToSand']});
        } else {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level6',
                winningScore: 9,
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level6', {
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToSand', 'sandToStone', 'sandToGrass', 'grassToSand']});
        }
        //currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToSand', 'sandToGrass']});
    });
    name.visible = false;
});

export const updateLevelButton = ((currentScene, name, settingsData, level): void => {
    name.disableInteractive();
    name.setInteractive();
    name.on('pointerdown', () => {
        currentScene.scene.stop('MainMenu');
        if(level == "level1") {
            currentScene.scene.start('Gui', {
                currentLevel: 'LevelTut1',
                winningScore: 1,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('LevelTut1', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToGrass']});
        }
        else if(level == "level2") {
            currentScene.scene.start('Gui', {
                currentLevel: 'LevelTut2',
                winningScore: 1,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('LevelTut2', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToGrass']});
        }
        else if(level == "level3") {
            currentScene.scene.start('Gui', {
                currentLevel: 'LevelTut3',
                winningScore: 2,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('LevelTut3', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToGrass']});
        }
        else if(level == "level4") {
            currentScene.scene.start('Gui', {
                currentLevel: 'LevelTut4',
                winningScore: 2,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('LevelTut4', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToSand', 'sandToStone','sandToGrass']});
        }
        else if(level == "level5") {
            currentScene.scene.start('Gui', {
                currentLevel: 'LevelTut5',
                winningScore: 1,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('LevelTut5', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['stoneToStone', 'stoneToSand', 'sandToGrass','grassToStone']});
        }
        else if(level == "level7") {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level7',
                winningScore: 8,
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level7', {
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToSand', 'sandToGrass', 'sandToStone']});
        }
        else if(level == "level8") {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level8',
                winningScore: 3,
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level8', {
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToGrass']});
        }
        else if(level == "level9") {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level9',
                winningScore: 5,
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level9', {
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToGrass', 'sandToStone', 'stoneToGrass', 'grassToSand']});
        } else {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level6',
                winningScore: 9,
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level6', {
                showGrid: settingsData.showGrid,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToSand', 'sandToStone', 'sandToGrass', 'grassToSand']});
        }
        //currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToSand', 'sandToGrass']});
    });
});

export function randomInt(min, max): number{
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 export function generateSheeps(amount, physics, width, height): void{
    let counter = 0;
    while (counter < amount){
        const sheep = physics.add.image(randomInt(0, width), randomInt(0, height), 'sheep_small');
        sheep.setVelocity(randomInt(50, 200), randomInt(50, 200));
        sheep.setBounce(1, 1);
        sheep.setCollideWorldBounds(true);
        counter = counter + 1;
    }
 }

export const initSettings = (currentScene, data): void => {
    if (data.musicVolume === undefined) {
        currentScene.musicVolume = 0.2;
        currentScene.showGrid = true;
    } else {
        currentScene.musicVolume = data.musicVolume;
        currentScene.showGrid = data.showGrid;
    }
};

export const initOptionsButton = ((currentScene, width, height): any => {
    const settings = currentScene.add.image(width / 2, height / 2 + 75, 'settings');
    const volume = currentScene.add.image(width / 2 - 100, height / 2 - 100, 'volume');
    const grid = currentScene.add.image(width / 2 - 100, height / 2 + 100, 'grid');
    const back = currentScene.add.image(width / 2 + 200, height / 2 - 100, 'back');

    volume.setDisplaySize(0.05   * width, 0.1 * height);
    volume.visible = false;
    grid.setDisplaySize(0.05   * width, 0.1 * height);
    grid.visible = false;
    back.setDisplaySize(0.05   * width, 0.1 * height);
    back.setInteractive(({ useHandCursor: true }));
    back.visible = false;
    settings.setDisplaySize(0.1 * width, 0.1 * height);
    settings.setInteractive(({ useHandCursor: true }));
    settings.visible = false;

    const settingsData = {
        settings: settings,
        volume: volume,
        grid: grid,
        backButton: back
    }
    return settingsData;
});

export function getTileTypeWithKey(key): Type {
    if (key == 'grassToStone'||key == 'sandToStone'||key == 'stoneToStone') return Type.Stone;
    if (key == 'sandToGrass'||key == 'grassToGrass'||key == 'stoneToGrass') return Type.Grass;
    if (key == 'stoneToSand'||key == 'sandToSand'||key == 'grassToSand') return Type.Sand;
    return null;
}

export function getPortalTypeWithKey(key): portalType {
    if (key == 'grassToGrass') return portalType.gtog;
    if (key == 'grassToSand') return portalType.gtosa;
    if (key == 'grassToStone') return portalType.gtost;
    if (key == 'stoneToSand') return portalType.sttosa;
    if (key == 'stoneToStone') return portalType.sttost;
    if (key == 'stoneToGrass') return portalType.sttog;
    if (key == 'sandToSand') return portalType.satosa;
    if (key == 'sandToStone') return portalType.satost;
    if (key == 'sandToGrass') return portalType.satog;
    return null;
}

export function makeCollider(scene: Phaser.Scene, sheep: Phaser.GameObjects.Group,
    fences: Phaser.GameObjects.Group, portals: Phaser.GameObjects.Group, board: Board): void {
    if(scene && sheep) {
        scene.physics.world.addCollider(sheep, sheep,
            (sheep1: Sheep, sheep2: Sheep) => {
                sheep1.collide(sheep2);
                sheep2.collide(sheep1);
            })
        if(fences) {
            scene.physics.world.addCollider(fences, sheep,
                (fence: Fence, sheep: Sheep) => {
                    sheep.collide(fence);
                })
        }
        if(portals) {
            scene.physics.world.addCollider(portals, sheep,
                (sheep: Sheep, portal: Portal) => {
                    portal.executeTeleport(scene, board, portals, sheep);
                    sheep.collide(portal);
                })
        }
    }
}

export function MappingNumbers(n: number): string{
    if (n == 1) return "ONE";
    if (n == 2) return "TWO";
    if (n == 3) return "THREE";
    if (n == 4) return "FOUR";
    if (n == 5) return "FIVE";
    if (n == 6) return "SIX";
    if (n == 7) return "SEVEN";
    if (n == 8) return "EIGHT";
    if (n == 9) return "NINE";

}

