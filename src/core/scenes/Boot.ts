import { Scene } from 'phaser';
import { model } from '../../main';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  init() {
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    this.load.on('progress', (progress: number) => {
      console.log('progress', progress);
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.tilemapTiledJSON('canteen-map', 'assets/canteen.json');
    this.load.tilemapTiledJSON('buffet-map', 'assets/buffet.json');
    this.load.tilemapTiledJSON('restroom-map', 'assets/restroom.json');
    this.load.tilemapTiledJSON('smoke-spot-map', 'assets/smoke-spot.json');

    this.load.image('background', 'assets/background.png');
    this.load.image('dev-by-background', 'assets/bottom-bar-background.png');
    this.load.image('window', 'assets/window.png');
    this.load.image('popup', 'assets/popup.png');

    this.load.image('collision-tileset', 'assets/collision.png');
    this.load.image('walls-tileset', 'assets/tileset.png');
    this.load.image('interiors-tileset', 'assets/interiors.png');
    this.load.image('stats-bar', 'assets/stats-bar.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('button-bg', 'assets/button-bg.png');
    this.load.image('info', 'assets/info.png');

    this.load.spritesheet('worker', 'assets/Alex_run_16x24.png', {
      frameWidth: 16,
      frameHeight: 24,
    });
  }

  create() {
    this.createAnimations();

    model.startGame();

    this.scene.start('MainMenu');
  }

  private createAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('worker', { start: 12, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('worker', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('worker', { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('worker', { start: 18, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
