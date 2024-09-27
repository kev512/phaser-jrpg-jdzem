import { Scene, GameObjects } from 'phaser';

export class Info extends Scene {
  seagull: GameObjects.Image;
  background: Phaser.GameObjects.Image;
  arrows: Phaser.GameObjects.Image;
  keyboardE: Phaser.GameObjects.Image;
  keyboardF: Phaser.GameObjects.Image;
  backButton: GameObjects.Text;

  constructor() {
    super('Info');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    this.background = this.add.image(545, 384, 'background');
    this.background.setScrollFactor(0);

    const squareWidth = 850;
    const squareHeight = 480;
    const x = this.cameras.main.centerX - squareWidth / 2;
    const y = this.cameras.main.centerY - squareHeight / 2;

    const background = this.add.graphics();

    background.fillStyle(0x000000, 1);
    background.fillRect(x, y+10, squareWidth, squareHeight);

    background.lineStyle(2, 0xFFFFFF, 1);
    background.strokeRect(x, y+10, squareWidth, squareHeight);

    const header1 = this.add.text(this.cameras.main.centerX - 360, this.cameras.main.centerY - 190, 'Opis:', {
      fontFamily: 'VT323',
      fontSize: '32px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    const description = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 80,
      'W "Byle do pauzy" wcielasz się w pracownika magazynu na emigracji.\nTwoim celem będzie rozmyślne i jak najefektywniejsze wykorzystanie\nprzerw w ciągu dnia roboczego, tak aby Twoje samopoczucie pozostało na jak najlepszym\npoziomie pod koniec dnia pracy.\nMusisz przetrwać 3 przerwy w ciągu dnia. Jedna przerwa trwa 15 min.\nPamiętaj - każda akcja, która będzie wpływała na poprawienie Twoich statystyk będzie Cię\nkosztować cenny czas przerwy. Grasz, dopóki szef Cię nie zwolni!', {
      fontFamily: 'VT323',
      fontSize: '22px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    const header2 = this.add.text(this.cameras.main.centerX - 320, this.cameras.main.centerY + 60, 'Sterowanie:', {
      fontFamily: 'VT323',
      fontSize: '32px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    const p1 = this.add.text(this.cameras.main.centerX - 305, this.cameras.main.centerY + 110, 'Poruszanie się:', {
      fontFamily: 'VT323',
      fontSize: '28px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    this.arrows = this.add.image(this.cameras.main.centerX - 100, this.cameras.main.centerY + 110, 'arrows');
    this.arrows.setScale(3);

    const p2 = this.add.text(this.cameras.main.centerX - 300, this.cameras.main.centerY + 155, 'Wykonanie akcji:', {
      fontFamily: 'VT323',
      fontSize: '28px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    this.keyboardE = this.add.image(this.cameras.main.centerX - 165, this.cameras.main.centerY + 155, 'keyboard-e');
    this.keyboardE.setScale(3);

    const p3 = this.add.text(this.cameras.main.centerX - 290, this.cameras.main.centerY + 200, 'Użycie przedmiotu:', {
      fontFamily: 'VT323',
      fontSize: '28px',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    this.keyboardF = this.add.image(this.cameras.main.centerX - 140, this.cameras.main.centerY + 200, 'keyboard-f');
    this.keyboardF.setScale(3);

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
