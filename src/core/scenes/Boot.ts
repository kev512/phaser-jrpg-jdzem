import { Scene } from 'phaser';
import { TILE_SIZE } from '../consts';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/bg-main-menu-example.png');
    this.load.image('tiles', 'assets/tileset.png');
    this.load.spritesheet('worker', 'assets/worker.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
    this.load.tilemapCSV('canteen', 'assets/canteen.csv');
    this.load.tilemapCSV('buffet', 'assets/buffet.csv');
  }

  create() {
    this.scene.start('Preloader');
  }
}
