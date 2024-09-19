import { Scene } from 'phaser';
import { TILE_SIZE } from '../consts';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.tilemapTiledJSON('canteen-map', 'assets/canteen.json');
    this.load.tilemapTiledJSON('buffet-map', 'assets/buffet.json');

    this.load.image('background', 'assets/background.png');

    this.load.image('collision-tileset', 'assets/collision.png');
    this.load.image('walls-tileset', 'assets/tileset.png');
    this.load.image('interiors-tileset', 'assets/interiors.png');

    this.load.spritesheet('worker', 'assets/worker.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}
