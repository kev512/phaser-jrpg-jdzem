import { isNull } from 'lodash';
import { model } from '../../../main';
import { MAP_BOUNDARY, WORKER_SIZE_SCALE } from '../../consts';
import { MapLoader } from '../../map-loader';
import { BaseScene } from './BaseScene';

export class Canteen extends BaseScene {
  constructor() {
    super('Canteen');
  }

  create() {
    this.createMap();

    this.createPlayer();

    this.addCollision();

    this.add.rectangle(1062, 0, 316, 1800, 0x212121);

    this.cameras.main.setBounds(
      MAP_BOUNDARY.x,
      MAP_BOUNDARY.y,
      MAP_BOUNDARY.width,
      MAP_BOUNDARY.height,
    );

    if (isNull(this.input.keyboard)) {
      throw new Error('Keyboard is null');
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    this.createLabels();
  }

  update() {
    const { worker } = model;
    const speed = worker.getSpeed();

    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
    }

    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }

    if (this.player.y <= 73) {
      if (this.player.x >= 552 && this.player.x <= 600) {
        this.startBuffetScene();
      }
    }

    if (this.player.y <= 216) {
      if (this.player.x >= 160 && this.player.x <= 193) {
        this.startRestroomScene();
      }
    }

    if (this.player.y >= 872) {
      if (this.player.x >= 447 && this.player.x <= 513) {
        this.startSmokeSpotScene();
      }
    }

    this.updateLabels();
  }

  private createMap() {
    const result = MapLoader.createMap('canteen-map', this);

    this.map = result.map;
    this.collisionLayer = result.collisionLayer;
  }

  private createPlayer() {
    let playerX = 862;
    let playerY = 569;

    if (model.previousScene === 'Buffet') {
      playerX = 584;
      playerY = 84;
    } else if (model.previousScene === 'Restroom') {
      playerX = 165;
      playerY = 218;
    } else if (model.previousScene === 'SmokeSpot') {
      playerX = 500;
      playerY = 865;
    }

    this.player = this.physics.add.sprite(playerX, playerY, 'worker', 19);
    this.player.setScale(WORKER_SIZE_SCALE);
  }

  private addCollision() {
    this.physics.add.collider(this.player, this.collisionLayer);
  }

  private startBuffetScene() {
    this.scene.start('Buffet');
    model.setScene('Buffet');
  }

  private startRestroomScene() {
    this.scene.start('Restroom');
    model.setScene('Restroom');
  }

  private startSmokeSpotScene() {
    this.scene.start('SmokeSpot');
    model.setScene('SmokeSpot');
  }
}
