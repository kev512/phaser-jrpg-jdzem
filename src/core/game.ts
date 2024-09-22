import { Game as PhaserGame } from 'phaser';
import { HEIGHT, WIDTH } from './consts';
import { Afternoon } from './scenes/Afternoon';
import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Buffet } from './scenes/map/Buffet';
import { Canteen } from './scenes/map/Canteen';
import { Restroom } from './scenes/map/Restroom';
import { SmokeSpot } from './scenes/map/SmokeSpot';
import { Intro } from './scenes/menu/Intro';
import { MainMenu } from './scenes/menu/MainMenu';
import { NewGameHints } from './scenes/menu/NewGameHints';
import { Scoreboard } from './scenes/menu/Scoreboard';
import { Shop } from './scenes/Shop';

export class Game {
  constructor() {
    new PhaserGame({
      type: Phaser.AUTO,
      width: WIDTH,
      height: HEIGHT,
      parent: 'game-container',
      backgroundColor: '#212121',
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
      scene: [
        Boot,
        Intro,
        MainMenu,
        NewGameHints,
        Canteen,
        Buffet,
        Restroom,
        SmokeSpot,
        Afternoon,
        Shop,
        GameOver,
        Scoreboard,
      ],
    });
  }
}
