import { Scene } from 'phaser';
import { model } from '../../main';

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameOverText: Phaser.GameObjects.Text;
  description: Phaser.GameObjects.Text;

  constructor() {
    super('GameOver');
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000);

    this.background = this.add.image(this.camera.centerX, this.camera.centerY, 'town-background');
    this.background.setAlpha(0.5);
    this.background.setScrollFactor(0);

    this.gameOverText = this.add.text(this.camera.centerX, this.camera.centerY - 64, 'Przegrałeś', {
      fontFamily: 'VT323',
      fontSize: 64,
      color: '#000000',
      stroke: '#dddddd',
      strokeThickness: 4,
    });
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.setScrollFactor(0);

    this.description = this.add.text(
      this.camera.centerX,
      this.camera.centerY + 64,
      `Za dużo spóźnień. Szef ciebie wywalił.\n\nTwoje punkty: ${model.scores.total}`,
      {
        fontFamily: 'VT323',
        fontSize: 32,
        color: '#000000',
        stroke: '#dddddd',
        strokeThickness: 4,
      },
    );
    this.description.setOrigin(0.5);
    this.description.setScrollFactor(0);

    this.input.once('pointerdown', () => {
      model.startGame();
      this.scene.start('MainMenu');
    });
  }
}
