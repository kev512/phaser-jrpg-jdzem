import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  newGameButton: GameObjects.Text;
  scoreboardButton: GameObjects.Text;

  constructor() {
    super('MainMenu');
  }

  create() {
    this.background = this.add.image(512, 384, 'background');

    this.logo = this.add.image(512, 300, 'logo');

    this.title = this.add
      .text(512, 460, 'Main Menu', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5);

    this.newGameButton = this.add
      .text(512, 520, 'Nowa Gra', {
        fontFamily: 'Arial',
        fontSize: 32,
        color: '#000000',
      })
      .setOrigin(0.5)
      .setInteractive();

    this.newGameButton.on('pointerdown', () => {
      this.scene.start('Canteen');
    });

    this.scoreboardButton = this.add
      .text(512, 580, 'Tablica wyników', {
        fontFamily: 'Arial',
        fontSize: 32,
        color: '#000000',
      })
      .setOrigin(0.5)
      .setInteractive();

    this.scoreboardButton.on('pointerdown', () => {
      this.scene.start('Scoreboard');
    });
  }
}
