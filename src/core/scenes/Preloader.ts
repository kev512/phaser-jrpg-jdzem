import { Scene } from 'phaser';
import { model } from '../../main';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  create() {
    model.startGame();

    this.scene.start('MainMenu');
  }
}
