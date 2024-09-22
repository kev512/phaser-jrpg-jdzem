import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  newGameButton: GameObjects.Text;
  scoreboardButton: GameObjects.Text;
  authorsButton: GameObjects.Text;
  infoButton: GameObjects.Text;
  devByLabel: GameObjects.Text;

  constructor() {
    super('MainMenu');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');
    this.background = this.add.image(545, 384, 'background');

    this.logo = this.add.image(590, 215, 'logo');
    this.logo.setScale(0.5);

    const textNewGameBackground = this.add.image(590, 412, 'button-bg');
    textNewGameBackground.setScale(0.45);
    textNewGameBackground.setOrigin(0.5);
    textNewGameBackground.setInteractive();
    textNewGameBackground.on('pointerdown', () => {
      this.scene.start('NewGameHints');
    });

    this.newGameButton = this.createMenuLabel(590, 410, 'Nowa Gra');
    this.newGameButton.on('pointerdown', () => {
      this.scene.start('NewGameHints');
    });

    const textScoreboardBackground = this.add.image(590, 487, 'button-bg');
    textScoreboardBackground.setScale(0.45);
    textScoreboardBackground.setOrigin(0.5);
    textScoreboardBackground.setInteractive();
    textScoreboardBackground.on('pointerdown', () => {
      this.scene.start('Scoreboard');
    });

    this.scoreboardButton = this.createMenuLabel(590, 485, 'Wyniki');

    this.scoreboardButton.on('pointerdown', () => {
      this.scene.start('Scoreboard');
    });

    const textAuthorsBackground = this.add.image(590, 562, 'button-bg');
    textAuthorsBackground.setScale(0.45);
    textAuthorsBackground.setOrigin(0.5);
    textAuthorsBackground.setInteractive();
    textAuthorsBackground.on('pointerdown', () => {
      this.scene.start('Authors');
    });

    this.authorsButton = this.createMenuLabel(590, 560, 'Autorzy');
    this.authorsButton.on('pointerdown', () => {
      this.scene.start('Authors');
    });

    const devByBackground = this.add.image(590, 690, 'dev-by-background');
    devByBackground.setScale(0.5);
    this.devByLabel = this.createMenuLabel(590, 687, 'Developed by White Seagull Team');

    const infoButton = this.add.image(1000, 100, 'button-bg');
    infoButton.setScale(0.25);
    infoButton.setOrigin(0.5);
    infoButton.setInteractive();
    infoButton.on('pointerdown', () => {
      this.scene.start('Info');
    });
    
    this.infoButton = this.createMenuLabel(1000, 98, 'Info');
    this.infoButton.on('pointerdown', () => {
      this.scene.start('Info');
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
