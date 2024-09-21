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

    this.newGameButton = this.createMenuLabel(512, 410, 'Nowa Gra');
    this.newGameButton.on('pointerdown', () => {
      this.scene.start('Canteen');
    });

    const textScoreboardBackground = this.add.image(512, 487, 'button-bg');
    textScoreboardBackground.setScale(0.45);
    textScoreboardBackground.setOrigin(0.5);

    this.scoreboardButton = this.createMenuLabel(512, 485, 'Wyniki');
    this.scoreboardButton.on('pointerdown', () => {
      this.scene.start('Scoreboard');
    });

    const textAuthorsBackground = this.add.image(512, 562, 'button-bg');
    textAuthorsBackground.setScale(0.45);
    textAuthorsBackground.setOrigin(0.5);

    this.authorsButton = this.createMenuLabel(512, 560, 'Autorzy');

    this.infoButton = this.add
      .image(972, 100, 'info')
      .setScale(0.5)
      .setOrigin(0.5)
      .setInteractive();
  }

  private createMenuLabel(x: number, y: number, text: string) {
    const label = this.add.text(x, y, text, {
      fontFamily: 'VT323',
      fontSize: 28,
      color: '#3A3A50'
    });

    label.setScrollFactor(0);
    label.setOrigin(.5);
    label.setInteractive();

    return label;
  }

}
