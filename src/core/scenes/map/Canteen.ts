import { isNull } from 'lodash';
import { model } from '../../../main';
import { MAP_BOUNDARY, TILE_SIZE, WORKER_SIZE_SCALE } from '../../consts';
import { MapLoader } from '../../map-loader';
import { BaseScene } from './BaseScene';
import { Lunch } from '../../../models/effects/items/lunch';

export class Canteen extends BaseScene {
  lockerPopup: Phaser.GameObjects.Image;
  lockerText: Phaser.GameObjects.Text;
  isNearLocker: boolean = false;

  restZonePopup: Phaser.GameObjects.Image;
  restZoneText: Phaser.GameObjects.Text;
  isNearRestZone: boolean = false;

  constructor() {
    super('Canteen');
  }

  create() {
    super.create();

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
    this.createWindow();

    this.createLockerPopup();
    this.createRestZonePopup();
  }

  update(time: number, deltaTime: number) {
    super.update(time, deltaTime);

    this.updatePlayer();

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
    this.updateWindow();

    this.isNearLocker =
      this.player.y === 264 && this.player.x >= 720 && this.player.x <= 800;
    this.updateLockerPopup(this.isNearLocker && !model.window.visible);

    this.isNearRestZone =
      this.player.y >= 600 &&
      this.player.y <= 748 &&
      this.player.x >= 112 &&
      this.player.x <= 272;
    this.updateRestZonePopup(this.isNearRestZone && !model.window.visible);

    console.log(this.player.x, this.player.y);
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

  private createLockerPopup() {
    const popupX = TILE_SIZE * 12.5;
    const popupY = TILE_SIZE * 1.75;

    this.lockerPopup = this.add.image(popupX, popupY, 'popup');
    this.lockerPopup.setScrollFactor(0);
    this.lockerText = this.add.text(
      popupX - 86,
      popupY - 10,
      'Otwórz szafkę [E]',
      {
        fontFamily: 'Pixelify Sans',
        fontSize: 20,
        color: '#000000',
        stroke: '#dddddd',
        strokeThickness: 2,
      },
    );
    this.lockerText.setScrollFactor(0);

    this.lockerPopup.setVisible(false);
    this.lockerText.setVisible(false);

    this.input.keyboard?.on('keydown-E', () => {
      if (this.isNearLocker) {
        model.window.visible = true;
        model.window.title = 'Szafka';

        let description =
          'Tutaj trzymasz swoje rzeczy\ni obiad który możesz kupić\npo pracy';

        if (model.worker.hasItem(new Lunch().getId())) {
          description =
            'W środku trzymasz lunchbox.\n\n1. Zjedz kupiony lunch [1]\n2. Wyjście [ESC]';
        }

        model.window.description = description;
      }
    });
  }

  private updateLockerPopup(visible: boolean) {
    this.lockerPopup.setVisible(visible);
    this.lockerText.setVisible(visible);
  }

  private createRestZonePopup() {
    const popupX = TILE_SIZE * 4;
    const popupY = TILE_SIZE * 10;

    this.restZonePopup = this.add.image(popupX, popupY, 'popup');
    this.restZonePopup.setScrollFactor(0);
    this.restZoneText = this.add.text(
      popupX - 86,
      popupY - 10,
      'Wycziluj [E]',
      {
        fontFamily: 'Pixelify Sans',
        fontSize: 20,
        color: '#000000',
        stroke: '#dddddd',
        strokeThickness: 2,
      },
    );
    this.restZoneText.setScrollFactor(0);

    this.restZonePopup.setVisible(false);
    this.restZoneText.setVisible(false);

    this.input.keyboard?.on('keydown-E', () => {
      if (this.isNearRestZone) {
        model.window.visible = true;
        model.window.title = 'Strefa czilałtu';

        model.window.description =
          'Za dużo stresu podczas pracy?\nWeź trochę wycziluj.\n\n1. Odpocznij [1]\n2. Wyjście [ESC]';
      }
    });
  }

  private updateRestZonePopup(visible: boolean) {
    this.restZonePopup.setVisible(visible);
    this.restZoneText.setVisible(visible);
  }
}
