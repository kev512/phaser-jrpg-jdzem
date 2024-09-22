import { isNull } from 'lodash';
import { model } from '../../../main';
import { WORKER_SIZE_SCALE } from '../../consts';
import { MapLoader } from '../../map-loader';
import { BaseScene } from './BaseScene';

export class SmokeSpot extends BaseScene {
  constructor() {
    super('SmokeSpot');
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
    super.createActionsPopup();
  }

  update(time: number, deltaTime: number) {
    super.update(time, deltaTime);

    this.updatePlayer(deltaTime);

    this.updateLabels();

    if (this.player.y <= 142) {
      this.startCanteenScene();
    }
  }

  private createMap() {
    const result = MapLoader.createMap('smoke-spot-map', this);

    this.map = result.map;
    this.collisionLayer = result.collisionLayer;
  }

  private createPlayer() {
    const playerX = 460;
    const playerY = 143;

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
}
