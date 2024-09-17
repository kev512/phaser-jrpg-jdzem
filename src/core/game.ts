import { Game as PhaserGame } from 'phaser';
import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/menu/MainMenu';
import { Scoreboard } from './scenes/menu/Scoreboard';
import { Preloader } from './scenes/Preloader';

export class Game {
  constructor() {
    new PhaserGame({
      type: Phaser.AUTO,
      width: 1024,
      height: 768,
      parent: 'game-container',
      backgroundColor: '#028af8',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [Boot, Preloader, MainMenu, MainGame, GameOver, Scoreboard],
    });
  }
}
