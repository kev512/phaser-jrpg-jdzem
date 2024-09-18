import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/bg-main-menu-example.png');
    this.load.image('tiles', 'assets/tileset.png');
    this.load.image('worker', 'assets/worker.png');
    this.load.tilemapCSV('map', 'assets/grid.csv');
  }

  create() {
    this.scene.start('Preloader');
  }
}
