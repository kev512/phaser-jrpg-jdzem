import { Scene } from 'phaser';
import { model } from '../../../main';

export class Canteen extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;

  msg_text: Phaser.GameObjects.Text;

  worker: Phaser.GameObjects.Image;
  background: Phaser.GameObjects.Image;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('Canteen');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xffff00);

    this.background = this.add.image(512, 384, 'background');
    this.background.setAlpha(0.5);

    this.worker = this.add.image(100, 100, 'worker');

    this.input.once('pointerdown', () => {
      this.scene.start('GameOver');
    });

    if (this.input.keyboard === null) {
      alert('Gra wymaga klawiatury');
      return;
    }

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = model.worker.getSpeed();
    const keyboard = this.input.keyboard;

    if (keyboard === null) {
      alert('Gra wymaga klawiatury');
      return;
    }

    if (keyboard.checkDown(this.cursors.left, speed)) {
      this.worker.x -= 2;
    } else if (keyboard.checkDown(this.cursors.right, speed)) {
      this.worker.x += 2;
    }

    if (keyboard.checkDown(this.cursors.up, speed)) {
      this.worker.y -= 2;
    } else if (keyboard.checkDown(this.cursors.down, speed)) {
      this.worker.y += 2;
    }
  }
}
