import { Scene, GameObjects } from 'phaser';
import { model } from '../../../main';

export class Scoreboard extends Scene {
  private backButton: GameObjects.Text;
  background: Phaser.GameObjects.Image;

  constructor() {
    super('Scoreboard');
  }

  create() {
    this.background = this.add.image(545, 384, 'background');
    this.background.setScrollFactor(0);

    const squareWidth = 750;
    const squareHeight = 360;
    const x = this.cameras.main.centerX - squareWidth / 2;
    const y = this.cameras.main.centerY - squareHeight / 2;

    const background = this.add.graphics();

    background.fillStyle(0x000000, 1);
    background.fillRect(x, y, squareWidth, squareHeight);

    background.lineStyle(2, 0xFFFFFF, 1);
    background.strokeRect(x, y, squareWidth, squareHeight);

    this.add
      .text(512, 300, `Tablica wyników\n\nTwój najlepszy wynik: ${model.scores.best}`, {
        fontFamily: 'VT323',
        fontSize: 48,
        color: '#eeeeee',
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setScrollFactor(0);

      const infoButton = this.add.image(1000, 100, 'button-bg');
      infoButton.setScale(0.25);
      infoButton.setOrigin(0.5);
      infoButton.setInteractive();
      infoButton.on('pointerdown', () => {
        this.scene.start('MainMenu');
      });
      
      this.backButton = this.createMenuLabel(1000, 98, 'Powrót');
      this.backButton.on('pointerdown', () => {
        this.scene.start('MainMenu');
      });

  }

  private createMenuLabel(x: number, y: number, text: string) {
    const label = this.add.text(x, y, text, {
      fontFamily: 'VT323',
      fontSize: 28,
      color: '#3A3A50',
    });

    label.setScrollFactor(0);
    label.setOrigin(0.5);
    label.setInteractive();

    return label;
  }

}
