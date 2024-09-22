import { model } from '../../../main';

export class NewGameHints extends Phaser.Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameover_text: Phaser.GameObjects.Text;

  constructor() {
    super('NewGameHints');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    this.background = this.add.image(545, 384, 'background');
    this.background.setScrollFactor(0);

    this.add
      .text(
        564,
        400,
        'Nowa praca, szansa na nowy start!\nPytanie tylko jak długo uda ci się wytrwać\nw tym pościgu za pieniądzem.\nUpewnij sie że wszystkie potrzeby są zaspokojone przed\nzakończeniem przerwy i pamiętaj, nie spóźnij się,\ntwój szef nie będzie tego tolerował!',
        {
          fontFamily: 'VT323',
          fontSize: 40,
          color: '#eeeeee',
          stroke: '#000000',
          strokeThickness: 8,
        },
      )
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setInteractive();

    this.input.once('pointerdown', () => {
      model.startGame();
      this.scene.start('Canteen');
    });
  }
}
