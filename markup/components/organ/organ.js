import Sprite from '../../../Core/markup/components/sprite/sprite';

export default class Organ extends PIXI.Container {
    constructor() {
        super();
        this.sprite = new Sprite({
            texture: PIXI.utils.TextureCache['close.png'],
            x: game.view.width / 2,
            y: game.view.height / 2
        });
    }
    handlers() {

    }
    update() {

    }
}
