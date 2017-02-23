import Sprite from '../../../Core/markup/components/sprite/sprite';
import Virus from '../virus/virus';
import Organ from '../organ/organ';

export default class Init {
    constructor() {
        this.viruses = [];

    }
    create() {
        this.bg = new Sprite({
            texture: PIXI.utils.TextureCache['bg_1'],
            anchor: 0
        });

        this.organ = new Organ();

        setInterval(() => {
            let newVirus = new Virus({
                name: `virus${Math.ceil(Math.random() * 4)}`,
                length: 4,
                deathName: 'dead',
                deathLength: 4,
                container: game.stage
            });
            this.viruses.push(newVirus);
        }, 500);
        window.initLevel = this;
    }
    update() {
        this.viruses.forEach((virus) => {
            virus.update();

            if (virus.isCrashed) return;
            if (virus.isAlive && this.hitTest(virus, this.organ.sprite)) {
                virus.isCrashed = true;
                virus.hasToKill = true;
                console.log('I must kill', virus);
            }
        });
        this.viruses = this.viruses.filter((virus) => virus.isAlive);
    }
    hitTest(sprite1, sprite2) {
        let hit = false;
        let deltaX = Math.abs(sprite1.x - sprite2.x);
        let deltaY = Math.abs(sprite1.y - sprite2.y);
        let sumOfRadius = sprite1.radius + sprite2.radius;

        if (deltaX <= sumOfRadius && deltaY <= sumOfRadius) {
            hit = true;
        }

        return hit;
    }
}
