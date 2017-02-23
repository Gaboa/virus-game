import * as PIXI from 'pixi.js';
import { TweenMax } from 'gsap';
import config from '../../components/config/config';
import Game from '../../../Core/markup/components/game/game';
import Init from '../../components/levels/init';

new Game(900, 1440);

game.preload(
    config.loadArray,
    'static/img/content/',
    () => {
        game.startLevel(Init);
    });
