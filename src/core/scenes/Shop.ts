import { Scene, GameObjects } from 'phaser';
import { model } from '../../main';
import { Lunch } from '../../models/effects/items/lunch';

export class Shop extends Scene {
  background: GameObjects.Image;
  titleText: GameObjects.Text;
  lunchButton: GameObjects.Text;
  diaperButton: GameObjects.Text;
  smokesButton: GameObjects.Text;
  beerButton: GameObjects.Text;
  resourcesText: GameObjects.Text;

  constructor() {
    super('Shop');
  }

  create() {
    this.cameras.main.setBackgroundColor('#44464A');

    this.background = this.add.image(545, 384, 'shop-background');
    this.background.setScrollFactor(0);

    const x = 300;
    const y = 120;
    const gap = 75;

    this.titleText = this.add
      .text(x, y, `Wchodzisz do sklepu u Stasi.\nMasz ${model.worker.getCash()} kasy.`, {
        fontFamily: 'VT323',
        fontSize: 40,
        color: '#eeeeee',
        stroke: '#000000',
        strokeThickness: 8,
      })
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setInteractive();

    const lunch = new Lunch();
    const lunchPrice = lunch.getPrice();
    this.add
      .image(x, y + gap * 2, 'button-xl-bg')
      .setScale(0.45)
      .setOrigin(0.5);
    this.lunchButton = this.createButtonLabel(x, y + gap * 2, `Kup bułe z kotletem na jutro (${lunchPrice})`);
    this.lunchButton.on('pointerdown', () => {
      if (model.worker.getCash() >= lunchPrice) {
        model.worker.decreaseCash(lunchPrice);
        model.worker.addItem(lunch);
      }
    });

    const DIAPER_PRICE = 100;
    this.add
      .image(x, y + gap * 3, 'button-xl-bg')
      .setScale(0.45)
      .setOrigin(0.5);
    this.diaperButton = this.createButtonLabel(
      x,
      y + gap * 3,
      `Zaopatrz się w pieluchę\nna czarny scenariusz (${DIAPER_PRICE})`,
    );
    this.diaperButton.on('pointerdown', () => {
      if (model.worker.getCash() >= DIAPER_PRICE) {
        model.worker.decreaseCash(DIAPER_PRICE);
        model.worker.addDiaper();
      }
    });

    const SMOKES_PRICE = 100;
    this.add
      .image(x, y + gap * 4, 'button-xl-bg')
      .setScale(0.45)
      .setOrigin(0.5);
    this.smokesButton = this.createButtonLabel(x, y + gap * 4, `Kup paczkę fajek (${SMOKES_PRICE})`);
    this.smokesButton.on('pointerdown', () => {
      if (model.worker.getCash() >= SMOKES_PRICE) {
        model.worker.decreaseCash(SMOKES_PRICE);
        model.worker.addSmokes();
      }
    });

    const BEER_PRICE = 100;
    this.add
      .image(x, y + gap * 5, 'button-xl-bg')
      .setScale(0.45)
      .setOrigin(0.5);
    this.beerButton = this.createButtonLabel(x, y + gap * 5, `Kup bronksa (${BEER_PRICE})`);
    this.beerButton.on('pointerdown', () => {
      if (model.worker.getCash() >= BEER_PRICE) {
        model.worker.decreaseCash(BEER_PRICE);
        model.worker.addBeer();
      }
    });

    this.add
      .image(x, y + gap * 6, 'button-xl-bg')
      .setScale(0.45)
      .setOrigin(0.5);
    this.beerButton = this.createButtonLabel(x, y + gap * 6, 'Wróć na kwadrat i wal w kimono');
    this.beerButton.on('pointerdown', () => {
      this.scene.start('Canteen');
    });

    this.resourcesText = this.add
      .text(x, y + gap * 8, ``, {
        fontFamily: 'VT323',
        fontSize: 24,
        color: '#eeeeee',
        stroke: '#000000',
        strokeThickness: 8,
      })
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setInteractive();
  }

  update(time: number, deltaTime: number) {
    super.update(time, deltaTime);

    this.titleText.setText(`Wchodzisz do sklepu u Stasi.\nMasz ${model.worker.getCash()} kasy.`);
    this.resourcesText.setText(
      `Lunch: ${model.worker.hasItem(new Lunch().getId()) ? 'TAK' : 'NIE'}  Pieluchy: ${model.worker.getDiapers()}  Bronksy: ${model.worker.getBeers()}  Fajki: ${model.worker.getSmokes()}`,
    );
  }

  private createButtonLabel(x: number, y: number, text: string) {
    return this.add
      .text(x, y, text, {
        fontFamily: 'VT323',
        fontSize: 20,
        color: '#3A3A50',
      })
      .setScrollFactor(0)
      .setOrigin(0.5)
      .setInteractive();
  }
}
