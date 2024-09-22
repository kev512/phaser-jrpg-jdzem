import { Scene, GameObjects } from 'phaser';

export class Authors extends Scene {
  seagull: GameObjects.Image;
  background: Phaser.GameObjects.Image;
  backButton: GameObjects.Text;

  constructor() {
    super('Authors');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    this.background = this.add.image(545, 384, 'background');
    this.background.setScrollFactor(0);

    const squareWidth = 750;
    const squareHeight = 470;
    const x = this.cameras.main.centerX - squareWidth / 2;
    const y = this.cameras.main.centerY - squareHeight / 2;

    const background = this.add.graphics();

    background.fillStyle(0x000000, 1);
    background.fillRect(x, y, squareWidth, squareHeight);

    background.lineStyle(2, 0xFFFFFF, 1);
    background.strokeRect(x, y, squareWidth, squareHeight);

    const header = this.add.text(this.cameras.main.centerX - 280, this.cameras.main.centerY - 190, 'Autorzy:', {
      fontFamily: 'VT323',
      fontSize: '32px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    const a1 = this.add.text(this.cameras.main.centerX - 180, this.cameras.main.centerY - 150, 'Krzysztof Pająk - developer', {
      fontFamily: 'VT323',
      fontSize: '28px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    const a2 = this.add.text(this.cameras.main.centerX - 200, this.cameras.main.centerY - 110, 'Kewin Plewa - developer', {
      fontFamily: 'VT323',
      fontSize: '28px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    const a3 = this.add.text(this.cameras.main.centerX - 162, this.cameras.main.centerY - 70, 'Stanisław Banaszek - developer', {
      fontFamily: 'VT323',
      fontSize: '28px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    const a4 = this.add.text(this.cameras.main.centerX - 162, this.cameras.main.centerY - 30, 'Nikodem Kaliński - game design', {
      fontFamily: 'VT323',
      fontSize: '28px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    const description = this.add.text(this.cameras.main.centerX - 5, this.cameras.main.centerY + 50,
      'Niniejsza produkcja została wykonana na Hello GameJam 2024!', {
      fontFamily: 'VT323',
      fontSize: '28px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    const dev = this.add.text(this.cameras.main.centerX + 220, this.cameras.main.centerY + 170,
      'White Seagull Team', {
      fontFamily: 'VT323',
      fontSize: '28px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

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
