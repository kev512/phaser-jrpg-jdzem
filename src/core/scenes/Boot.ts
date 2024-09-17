import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.setPath('assets');

    this.load.image('logo', 'logo.png');
    this.load.image('background', 'bg.png');
    this.load.image('worker', 'worker.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
