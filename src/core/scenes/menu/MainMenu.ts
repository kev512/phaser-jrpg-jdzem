import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  newGameButton: GameObjects.Text;
  scoreboardButton: GameObjects.Text;
  authorsButton: GameObjects.Text;
  infoButton: GameObjects.Image;

  constructor() {
    super('MainMenu');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');
    this.background = this.add.image(512, 384, 'background');
    this.background.setScale(0.5);

    this.logo = this.add.image(512, 215, 'logo');
    this.logo.setScale(0.5);

    const textNewGameBackground = this.add.image(512, 412, 'button-bg');
    textNewGameBackground.setScale(0.45);
    textNewGameBackground.setOrigin(0.5);

    this.newGameButton = this.add
      .text(512, 410, 'Nowa Gra', {
        fontFamily: 'Pixelify Sans',
        fontSize: 28,
        color: '#000000'
      })
      .setOrigin(0.5)
      .setInteractive();

    const textScoreboardBackground = this.add.image(512, 487, 'button-bg');
    textScoreboardBackground.setScale(0.45);
    textScoreboardBackground.setOrigin(0.5);

    this.newGameButton.on('pointerdown', () => {
      this.scene.start('Canteen');
    });

    this.scoreboardButton = this.add
      .text(512, 485, 'Wyniki', {
        fontFamily: 'Pixelify Sans',
        fontSize: 28,
        color: '#000000'
      })
      .setOrigin(0.5)
      .setInteractive();

    this.scoreboardButton.on('pointerdown', () => {
      this.scene.start('Scoreboard');
    });

    const textAuthorsBackground = this.add.image(512, 562, 'button-bg');
    textAuthorsBackground.setScale(0.45);
    textAuthorsBackground.setOrigin(0.5);

    this.authorsButton = this.add
      .text(512, 560, 'Autorzy', {
        fontFamily: 'Pixelify Sans',
        fontSize: 28,
        color: '#000000'
      })
      .setOrigin(0.5)
      .setInteractive();

      this.infoButton = this.add
      .image(972, 100, 'info')
      .setScale(0.5)
      .setOrigin(0.5)
      .setInteractive();
  }
}
