export function initButton(name): void {
    name.setInteractive(({ useHandCursor: true }));
    name.on('pointerover', () => {
        name.setTintFill(0xAEFFFD);
    });
    name.on('pointerout', () => {
        name.setTintFill(0xFFFFFF);
    });
}

export const initLevelButton = ((currentScene, name, width, height, showGrid): void => {
    name.setDisplaySize(0.05   * width, 0.1 * height);
    name.setInteractive(({ useHandCursor: true }));
    name.on('pointerdown', () => {
        currentScene.scene.stop('MainMenu');
        currentScene.scene.start('Gui', {currentLevel: 'Level1', winningScore: 20});
        currentScene.scene.start('Level1', {showGrid: showGrid});
    });
    name.visible = false;
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

 export function createButton(scene, text, name): any {
    const COLOR_DARK = 0xFFFFFF;
    if (name === undefined) {
        name = text;
    }
    const button = scene.rexUI.add.label({
        width: 100,
        height: 40,
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        icon: scene.add.circle(0, 0, 10).setStrokeStyle(1, COLOR_DARK),
        space: {
            left: 10,
            right: 10,
            icon: 10
        },
        name: name
    });

    return button;
}

export const initSettings = (currentScene, data): void => {
    if (data.volume === undefined) {
        currentScene.musicVolume = 0.5;
        currentScene.brightness = 0.5;
        currentScene.showGrid = false;
    } else {
        currentScene.musicVolume = data.volume;
        currentScene.brightness = data.brightness;
        currentScene.showGrid = data.showGrid;
    }
};