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
