import Sprite from '../../../Core/markup/components/sprite/sprite';

export default class Organ extends PIXI.Container {
    constructor({
        name,
        length
    }) {
        super();
        this.name = name;
        this.length = length;
        this.health = 6;
        this.radius = 115;
        this.isDead = false;

        this.animations = [];
        this.currentAnimation = 0;
        this.createOrganAnimations(this.name, this.length, this.health);

        this.buble = new Sprite({
            texture: PIXI.utils.TextureCache['buble.png'],
            y: game.view.height / 2,
            x: game.view.width / 2,
            container: this
        });
        this.buble.radius = this.radius;

        this.circle = new PIXI.Graphics();
        this.circle.beginFill(0x000000, 0.3);
        this.circle.drawCircle(this.buble.x, this.buble.y, this.radius);
        this.circle.endFill();
        // It is debug circle to debug collisions
        // this.addChild(this.circle);

        game.stage.addChild(this);
    }
    handlers() {

    }
    update() {
        if (this.currentAnimation == 5) {
            this.isDead = true;
        }

        if (this.isDead) return;

        if (!this.animations[this.currentAnimation].visible) {
            this.animations.forEach((animation) => animation.visible = false );
            this.animations[this.currentAnimation].visible = true;
            this.animations[this.currentAnimation].play();
        }
    }
    crash() {
        this.currentAnimation++;
    }
    createArrayOfTextures(name, length, prefix = '') {
        let result = [];
        for (let i = 1; i <= length; i++) {
            result.push(PIXI.utils.TextureCache[`${name}_${prefix}${i}.png`]);
        }
        return result;
    }
    createOrganAnimations(name, length, amount) {
        for (let i = 1; i <= amount; i++) {
            let arrayOfTextures = this.createArrayOfTextures(`${name}${i}`, length);
            let animation = new PIXI.extras.AnimatedSprite(arrayOfTextures);
            animation.x = game.view.width / 2;
            animation.y = game.view.height / 2;
            animation.anchor.set(0.5);
            animation.visible = false;
            animation.animationSpeed = 0.15;
            this.addChild(animation);
            this.animations.push(animation);
        }
    }
}
