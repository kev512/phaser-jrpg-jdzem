import { Scene, GameObjects } from 'phaser';
import { model } from '../../../main';

export class Scoreboard extends Scene {
  private backButton: GameObjects.Text;

  constructor() {
    super('Scoreboard');
  }

  create() {
    this.add
      .text(512, 200, `Tablica wyników\n\nTwój najlepszy wynik: ${model.scores.best}`, {
        fontFamily: 'VT323',
        fontSize: 48,
        color: '#eeeeee',
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.backButton = this.add
      .text(512, 400, 'Powrót', {
        fontFamily: 'VT323',
        fontSize: 48,
        color: '#eeeeee',
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setInteractive();

    this.backButton.on('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
