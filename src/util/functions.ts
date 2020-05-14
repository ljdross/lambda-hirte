export function initButton(name): void {
    name.setInteractive(({ useHandCursor: true }));
    name.on('pointerover', () => {
        name.setTintFill(0xAEFFFD);
    });
    name.on('pointerout', () => {
        name.setTintFill(0xFFFFFF);
    });
}

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