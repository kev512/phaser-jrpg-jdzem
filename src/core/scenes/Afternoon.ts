import { Scene, GameObjects } from 'phaser';
import { model } from '../../main';

export class Afternoon extends Scene {
  background: GameObjects.Image;
  homeButton: GameObjects.Text;
  shopButton: GameObjects.Text;

  constructor() {
    super('Afternoon');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');
    this.background = this.add.image(545, 384, 'background');
    this.background.setScrollFactor(0);

    const x = 590;

    const homeButtonBackground = this.add.image(x, 412, 'button-large-bg');
    homeButtonBackground.setScale(0.45);
    homeButtonBackground.setOrigin(0.5);

    this.homeButton = this.createButtonLabel(x, 410, 'Wróć do domu');

    this.homeButton.on('pointerdown', () => {
      model.timerObject.reset();
      this.scene.start('Canteen');
    });

    const shopButtonBackground = this.add.image(x, 487, 'button-large-bg');
    shopButtonBackground.setScale(0.45);
    shopButtonBackground.setOrigin(0.5);

    this.shopButton = this.createButtonLabel(x, 485, 'Skocz do sklepu i potem do domu');

    this.shopButton.on('pointerdown', () => {
      this.scene.start('Shop');
    });

    const label = this.add.text(
      x,
      200,
      'Ktoś powie, że to tylko praca.\nJa powiem, że to bitwa o przetrwanie,\nale przetrwałem, więc jestem zwycięzcą.\n\n'
      + 'Teraz masz wybór! Albo pędzisz prosto do domu,\nwciągasz kapcie i padasz do łoża jak król..\nalbo zaglądasz do sklepu u Stasi po zaopatrzenie\nna kolejny pełen wrażeń dzień.\nNo to jak, co wybierasz kolego?',
      {
        fontFamily: 'VT323',
        fontSize: 24,
        color: '#eeeeee',
        stroke: '#000000',
        strokeThickness: 4,
      },
    );
    label.setScrollFactor(0);
    label.setOrigin(0.5);
    label.setInteractive();
  }

  private createButtonLabel(x: number, y: number, text: string) {
    return this.add
      .text(x, y, text, {
        fontFamily: 'VT323',
        fontSize: 28,
        color: '#3A3A50',
      })
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setInteractive();
  }
}
