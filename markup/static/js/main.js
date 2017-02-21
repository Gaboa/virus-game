import * as PIXI from 'pixi.js';
import config from '../../components/config/config';
import Game from '../../../Core/markup/components/game/game';
import Init from '../../components/levels/init';

new Game(1024, 768);

game.preload(
    config.loadArray,
    'static/img/content/',
    () => {
        game.startLevel(Init);
    });
