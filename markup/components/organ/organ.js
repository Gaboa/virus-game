import Sprite from '../../../Core/markup/components/sprite/sprite';

export default class Organ extends PIXI.Container {
    constructor() {
        super();
        this.radius = 45;
        this.sprite = new Sprite({
            texture: PIXI.utils.TextureCache['close.png'],
            x: game.view.width / 2,
            y: game.view.height / 2
        });
        this.sprite.radius = this.radius;
        this.circle = new PIXI.Graphics();
        this.circle.beginFill(0x000000, 0.3);
        this.circle.drawCircle(this.sprite.x, this.sprite.y, this.radius);
        this.circle.endFill();
        game.stage.addChild(this.circle);
    }
    handlers() {

    }
    update() {

    }
}
