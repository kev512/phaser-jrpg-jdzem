import { isNull } from 'lodash';
import { model } from '../../../main';
import { BuffetLunch } from '../../../models/effects/events/map/buffet/buffet-lunch';
import { WORKER_SIZE_SCALE } from '../../consts';
import { MapLoader } from '../../map-loader';
import { BaseScene } from './BaseScene';

export class Buffet extends BaseScene {
  buffetLunchPopup: Phaser.GameObjects.Image;
  buffetLunchText: Phaser.GameObjects.Text;
  isNearChef: boolean = false;

  constructor() {
    super('Buffet');
  }

  create() {
    super.create();

    this.createMap();

    this.createPlayer();

    this.addCollision();

    this.add.rectangle(1062, 0, 316, 1800, 0x212121);

    super.setCameraBounds();

    if (isNull(this.input.keyboard)) {
      throw new Error('Keyboard is null');
    }
    this.cursors = this.input.keyboard.createCursorKeys();

    super.createLabels();
    super.createWindow();

    this.createBuyBuffetLunchPopup();
  }

  update(time: number, deltaTime: number) {
    super.update(time, deltaTime);

    this.updatePlayer(deltaTime);

    if (this.player.y >= 982) {
      if (this.player.x >= 552 && this.player.x <= 984) {
        this.starCanteenScene();
      }
    }

    this.updateLabels();
    this.updateWindow();

    this.isNearChef = this.player.y === 360 && this.player.x >= 480 && this.player.x <= 530;
    this.updateBuyBuffetLunchPopup(this.isNearChef && !model.isWindowVisible);

    console.log(this.player.x, this.player.y);
  }

  private createMap() {
    const result = MapLoader.createMap('buffet-map', this);

    this.map = result.map;
    this.collisionLayer = result.collisionLayer;
  }

  private createPlayer() {
    const playerX = 579;
    const playerY = 851;

    this.player = this.physics.add.sprite(playerX, playerY, 'worker', 19);
    this.player.setScale(WORKER_SIZE_SCALE);
  }

  private addCollision() {
    this.physics.add.collider(this.player, this.collisionLayer);
  }

  private starCanteenScene() {
    this.scene.start('Canteen');
    model.setScene('Canteen');
  }

  private createBuyBuffetLunchPopup() {
    const popupX = 500;
    const popupY = 150;

    this.buffetLunchPopup = this.add.image(popupX, popupY, 'popup');
    this.buffetLunchPopup.setScrollFactor(0);
    this.buffetLunchText = this.add.text(popupX - 86, popupY - 10, 'Kup obiad [E]', {
      fontFamily: 'Pixelify Sans',
      fontSize: 20,
      color: '#000000',
      stroke: '#dddddd',
      strokeThickness: 2,
    });
    this.buffetLunchText.setScrollFactor(0);

    this.buffetLunchPopup.setVisible(false);
    this.buffetLunchText.setVisible(false);

    this.input.keyboard?.on('keydown-E', () => {
      if (this.isNearChef) {
        model.showWindow(
          'Kup jedzenie',
          'W ten dzień możesz kupić\ndanie dnia!\n\n' + '1. Kup i zjedz danie dnia [1]\n' + '2. Wyjście [ESC]',
          [new BuffetLunch()],
        );
      }
    });
  }

  private updateBuyBuffetLunchPopup(visible: boolean) {
    this.buffetLunchPopup.setVisible(visible);
    this.buffetLunchText.setVisible(visible);
  }
}
