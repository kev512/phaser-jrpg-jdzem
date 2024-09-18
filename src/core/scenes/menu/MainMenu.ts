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
    this.cameras.main.setBackgroundColor('#000000');
    this.background = this.add.image(512, 384, 'background');
    this.background.setScale(0.5);

    this.logo = this.add.image(512, 300, 'logo');

    this.title = this.add
      .text(512, 420, 'Menu', {
        fontFamily: 'Pixelify Sans',
        fontSize: 72,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5);

    this.newGameButton = this.add
      .text(512, 500, 'Nowa Gra', {
        fontFamily: 'Pixelify Sans',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
      })
      .setOrigin(0.5)
      .setInteractive();

    this.newGameButton.on('pointerdown', () => {
      this.scene.start('Canteen');
    });

    this.scoreboardButton = this.add
      .text(512, 560, 'Tablica wyników', {
        fontFamily: 'Pixelify Sans',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
      })
      .setOrigin(0.5)
      .setInteractive();

    this.scoreboardButton.on('pointerdown', () => {
      this.scene.start('Scoreboard');
    });
  }
}
