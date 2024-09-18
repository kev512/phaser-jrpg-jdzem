import { Scene, GameObjects } from 'phaser';

export class Scoreboard extends Scene {
  private backButton: GameObjects.Text;

  constructor() {
    super('Scoreboard');
  }

  create() {
    this.add
      .text(512, 200, 'Tablica wyników', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5);

    this.backButton = this.add
      .text(512, 400, 'Powrót', {
        fontFamily: 'Arial',
        fontSize: 32,
        color: '#000000',
      })
      .setOrigin(0.5)
      .setInteractive();

    this.backButton.on('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
