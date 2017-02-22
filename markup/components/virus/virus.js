export default class Virus extends PIXI.Container {
    constructor({
        birthSide = Math.floor(Math.random() * 4 + 1),
        x,
        y,
        name,
        length,
        deathName,
        deathLength,
        container
    }) {
        super();
        this.birthSide = birthSide;
        this.calculateStartPosition(this.birthSide);
        if (x) {
            this.x = x;
        }
        if (y) {
            this.y = y;
        }

        this.isAlive = true;
        this.hasToMove = true;
        this.hasToKill = false;

        this.name = name;
        this.length = length;
        this.virusArray = this.createArrayOfTextures(this.name, this.length);
        this.virusAnimation = new PIXI.extras.AnimatedSprite(this.virusArray);
        this.virusAnimation.animationSpeed = 0.1;
        this.virusAnimation.anchor.set(0.5);

        this.deathName = deathName;
        this.deathLength = deathLength;
        this.deathArray = this.createArrayOfTextures(this.deathName, this.deathLength, '0');
        this.deathAnimation = new PIXI.extras.AnimatedSprite(this.deathArray);
        this.deathAnimation.animationSpeed = 0.2;
        this.deathAnimation.anchor.set(0.5);
        this.deathAnimation.loop = false;
        this.deathAnimation.visible = false;

        this.addChild(this.deathAnimation);
        this.addChild(this.virusAnimation);
        container.addChild(this);

        this.virusAnimation.play();
        this.handlers();
    }
    handlers() {
        this.virusAnimation.interactive = true;
        this.virusAnimation.on('pointerdown', () => {
            this.hasToKill = true;
        });
    }
    update() {
        if (!this.isAlive) return;

        this.rotate();
        if (this.hasToMove) {
            this.move();
            this.hasToMove = false;
        }
        if (this.hasToKill) {
            this.kill();
            this.hasToKill = false;
        }
    }
    calculateStartPosition(side) {
        switch (side) {
            case 1:
                this.y = -100;
                this.x = Math.random() * game.view.width;
                break;
            case 2:
                this.x = game.view.width + 100;
                this.y = Math.random() * game.view.height;
                break;
            case 3:
                this.y = game.view.height + 100;
                this.x = Math.random() * game.view.width;
                break;
            case 4:
                this.x = -100;
                this.y = Math.random() * game.view.height;
                break;
            default:
                console.log('We have no such side!');
                break;
        }
    }
    createArrayOfTextures(name, length, prefix = '') {
        let result = [];
        for (let i = 1; i <= length; i++) {
            result.push(PIXI.utils.TextureCache[`${name}_${prefix}${i}.png`]);
        }
        return result;
    }
    move() {
        let randomX = game.view.width / 2;
        let randomY = game.view.height / 2;

        this.tween = TweenMax.to(this, 7, {
            x: randomX,
            y: randomY,
            ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 0.2, points: 20, taper: 'none', randomize: true, clamp: false })
        });

        setTimeout(() => {
            this.hasToMove = true;
        }, Math.random() * 5000 + 2000);
    }
    rotate() {
        this.rotation += 0.01 * Math.random() * 3;
    }
    kill() {
        this.virusAnimation.visible = false;
        this.deathAnimation.visible = true;
        this.deathAnimation.play();

        TweenMax.to(this, 0.5, {
            alpha: 0,
            onComplete: this.destroy.bind(this)
        });
    }
    destroy() {
        super.destroy();
        this.isAlive = false;
        TweenMax.killTweensOf(this);
    }
}

