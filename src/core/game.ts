import { Game as PhaserGame } from 'phaser';
import { HEIGHT, WIDTH } from './consts';
import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Canteen } from './scenes/map/Canteen';
import { MainMenu } from './scenes/menu/MainMenu';
import { Scoreboard } from './scenes/menu/Scoreboard';
import { Preloader } from './scenes/Preloader';
import { Buffet } from './scenes/map/Buffet';

export class Game {
  constructor() {
    new PhaserGame({
      type: Phaser.AUTO,
      width: WIDTH,
      height: HEIGHT,
      parent: 'game-container',
      backgroundColor: '#000000',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
        },
      },
      scene: [Boot, Preloader, MainMenu, Canteen, Buffet, GameOver, Scoreboard],
    });
  }
}
