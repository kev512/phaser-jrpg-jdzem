import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.tilemapTiledJSON('canteen-map', 'assets/canteen.json');
    this.load.tilemapTiledJSON('buffet-map', 'assets/buffet.json');
    this.load.tilemapTiledJSON('restroom-map', 'assets/restroom.json');
    this.load.tilemapTiledJSON('smoke-spot-map', 'assets/smoke-spot.json');

    this.load.image('background', 'assets/background.png');

    this.load.image('collision-tileset', 'assets/collision.png');
    this.load.image('walls-tileset', 'assets/tileset.png');
    this.load.image('interiors-tileset', 'assets/interiors.png');

    this.load.spritesheet('worker', 'assets/Alex_run_16x24.png', {
      frameWidth: 16,
      frameHeight: 24,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}
