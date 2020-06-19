import {Type} from "../objects/tile";
import {portalType} from "../objects/Teleport";

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
        if(level == "level4") {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level1Tut',
                winningScore: 10,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level1Tut', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
        }
        else if(level == "level2") {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level2',
                winningScore: 10,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level2', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
        } else {
            currentScene.scene.start('Gui', {
                currentLevel: 'Level1',
                winningScore: 7,
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
            currentScene.scene.start('Level1', {
                showGrid: settingsData.showGrid,
                brightness: settingsData.brightness,
                musicVolume: settingsData.musicVolume
            });
        }
        currentScene.scene.start('teleportGUI', {teleporters: ['grassToStone', 'stoneToSand', 'sandToGrass']});
    });
    name.visible = false;
});

export const updateLevelButton = ((currentScene, name, settingsData): void => {
    name.disableInteractive();
    name.setInteractive();
    name.on('pointerdown', () => {
        currentScene.scene.stop('MainMenu');
        currentScene.scene.start('Gui', {
            currentLevel: 'Level1',
            winningScore: 7,
            showGrid: settingsData.showGrid,
            brightness: settingsData.brightness,
            musicVolume: settingsData.musicVolume
        });
        currentScene.scene.start('Level1', {
            showGrid: settingsData.showGrid,
            brightness: settingsData.brightness,
            musicVolume: settingsData.musicVolume
        });
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
        currentScene.musicVolume = 0.5;
        currentScene.brightness = 0.5;
        currentScene.showGrid = false;
    } else {
        currentScene.musicVolume = data.musicVolume;
        currentScene.brightness = data.brightness;
        currentScene.showGrid = data.showGrid;
    }
    currentScene.cameras.main.setAlpha(currentScene.brightness * 2);
};

export const initOptionsButton = ((currentScene, width, height): any => {
    const settings = currentScene.add.image(width / 2, height / 2 + 75, 'settings');
    const volume = currentScene.add.image(width / 2 - 100, height / 2 - 100, 'volume');
    const brightness = currentScene.add.image(width / 2 - 100, height / 2, 'brightness');
    const grid = currentScene.add.image(width / 2 - 100, height / 2 + 100, 'grid');
    const back = currentScene.add.image(width / 2 + 200, height / 2 - 100, 'back');

    volume.setDisplaySize(0.05   * width, 0.1 * height);
    volume.visible = false;
    brightness.setDisplaySize(0.05   * width, 0.1 * height);
    brightness.visible = false;
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
        brightness: brightness,
        grid: grid,
        backButton: back
    }
    return settingsData;
});

export function getTileTypeWithKey(key): Type {
    if (key == 'grassToStone') return Type.Stone;
    if (key == 'sandToGrass') return Type.Grass;
    if (key == 'stoneToSand') return Type.Sand;
    return null;
}

export function getPortalTypeWithKey(key): portalType {
    if (key == 'grassToStone') return portalType.gtost;
    if (key == 'sandToGrass') return portalType.satog;
    if (key == 'stoneToSand') return portalType.sttosa;
    return null;
}
