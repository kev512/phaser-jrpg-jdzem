import { isNull } from 'lodash';
import { model } from '../../../main';
import { Pissoir } from '../../../models/effects/events/map/restroom/pissoir';
import { Toilet } from '../../../models/effects/events/map/restroom/toilet';
import { TILE_SIZE, WORKER_SIZE_SCALE } from '../../consts';
import { MapLoader } from '../../map-loader';
import { BaseScene } from './BaseScene';

export class Restroom extends BaseScene {
  urinalPopup: Phaser.GameObjects.Image;
  urinalText: Phaser.GameObjects.Text;
  isNearUrinal: boolean = false;
  toiletPopup: Phaser.GameObjects.Image;
  toiletText: Phaser.GameObjects.Text;
  isNearToilet: boolean = false;

  constructor() {
    super('Restroom');
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
    this.createWindow();

    this.createUrinalPopup();
    this.createToiletPopup();
  }

  update(time: number, deltaTime: number) {
    super.update(time, deltaTime);

    this.updatePlayer(deltaTime);

    if (this.player.y >= 876) {
      if (this.player.x >= 160 && this.player.x <= 176) {
        this.startCanteenScene();
      }
    }

    this.updateLabels();
    this.updateWindow();

    this.isNearUrinal = this.player.y >= 504 && this.player.y <= 508 && this.player.x >= 496 && this.player.x <= 656;
    this.updateUrinalPopup(this.isNearUrinal && !model.isWindowVisible);

    this.isNearToilet = this.player.y >= 504 && this.player.y <= 508 && this.player.x >= 334 && this.player.x <= 393;
    this.updateToiletPopup(this.isNearToilet && !model.isWindowVisible);
  }

  private createMap() {
    const result = MapLoader.createMap('restroom-map', this);

    this.map = result.map;
    this.collisionLayer = result.collisionLayer;
  }

  private createPlayer() {
    const playerX = 168;
    const playerY = 845;

    this.player = this.physics.add.sprite(playerX, playerY, 'worker', 19);
    this.player.setScale(WORKER_SIZE_SCALE);
  }

  private addCollision() {
    this.physics.add.collider(this.player, this.collisionLayer);
  }

  private startCanteenScene() {
    this.scene.start('Canteen');
    model.setScene('Canteen');
  }

  private createUrinalPopup() {
    const popupX = TILE_SIZE * 12.5;
    const popupY = TILE_SIZE * 5;

    this.urinalPopup = this.add.image(popupX, popupY, 'popup');
    this.urinalPopup.setScrollFactor(0);
    this.urinalText = this.add.text(popupX - 86, popupY - 10, 'Użyj pisuaru [E]', {
      fontFamily: 'Pixelify Sans',
      fontSize: 20,
      color: '#000000',
      stroke: '#dddddd',
      strokeThickness: 2,
    });
    this.urinalText.setScrollFactor(0);

    this.urinalPopup.setVisible(false);
    this.urinalText.setVisible(false);

    this.input.keyboard?.on('keydown-E', () => {
      if (this.isNearUrinal) {
        model.showWindow('Pisuar', 'Czy to czas na odcedzenie kartofelków?\n\n' + '1. Załatw potrzebę. [1]\n' + '2. Wyjście [ESC]', [
          new Pissoir(),
        ]);
      }
    });
  }

  private updateUrinalPopup(visible: boolean) {
    this.urinalPopup.setVisible(visible);
    this.urinalText.setVisible(visible);
  }

  private createToiletPopup() {
    const popupX = TILE_SIZE * 7.5;
    const popupY = TILE_SIZE * 5;

    this.toiletPopup = this.add.image(popupX, popupY, 'popup');
    this.toiletPopup.setScrollFactor(0);
    this.toiletText = this.add.text(popupX - 86, popupY - 10, 'Użyj sedesu [E]', {
      fontFamily: 'Pixelify Sans',
      fontSize: 20,
      color: '#000000',
      stroke: '#dddddd',
      strokeThickness: 2,
    });
    this.toiletText.setScrollFactor(0);

    this.toiletPopup.setVisible(false);
    this.urinalText.setVisible(false);

    this.input.keyboard?.on('keydown-E', () => {
      if (this.isNearToilet) {
        model.showWindow('Sedes', 'Siadasz na tronie?\n\n' + '1. Załatw potrzebę. [1]\n' + '2. Wyjście [ESC]', [
          new Toilet(),
        ]);
      }
    });
  }

  private updateToiletPopup(visible: boolean) {
    this.toiletPopup.setVisible(visible);
    this.toiletText.setVisible(visible);
  }
}
