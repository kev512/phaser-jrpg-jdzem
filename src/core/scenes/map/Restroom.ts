import { isNull } from 'lodash';
import { model } from '../../../main';
import { WORKER_SIZE_SCALE } from '../../consts';
import { MapLoader } from '../../map-loader';
import { BaseScene } from './BaseScene';

export class Restroom extends BaseScene {
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
}
