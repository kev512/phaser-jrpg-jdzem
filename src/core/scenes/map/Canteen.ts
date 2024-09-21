import { isNull } from 'lodash';
import { model } from '../../../main';
import { Rest } from '../../../models/effects/events/map/canteen/rest';
import { Snack } from '../../../models/effects/events/map/canteen/snack';
import { Soda } from '../../../models/effects/events/map/canteen/soda';
import { Lunch } from '../../../models/effects/items/lunch';
import { TILE_SIZE, WORKER_SIZE_SCALE } from '../../consts';
import { MapLoader } from '../../map-loader';
import { BaseScene } from './BaseScene';

export class Canteen extends BaseScene {
  lockerPopup: Phaser.GameObjects.Image;
  lockerText: Phaser.GameObjects.Text;
  isNearLocker: boolean = false;

  restZonePopup: Phaser.GameObjects.Image;
  restZoneText: Phaser.GameObjects.Text;
  isNearRestZone: boolean = false;

  vendingMachinePopup: Phaser.GameObjects.Image;
  vendingMachineText: Phaser.GameObjects.Text;
  isNearVendingMachine: boolean = false;

  computerPopup: Phaser.GameObjects.Image;
  computerText: Phaser.GameObjects.Text;
  isNearComputer: boolean = false;

  constructor() {
    super('Canteen');
  }

  create() {
    super.create();

    this.createMap();

    this.createPlayer();

    this.addCollision();

    super.setCameraBounds();

    if (isNull(this.input.keyboard)) {
      throw new Error('Keyboard is null');
    }

    this.cursors = this.input.keyboard.createCursorKeys();

    this.createLabels();
    this.createWindow();

    this.createLockerPopup();
    this.createRestZonePopup();
    this.createVendingMachinePopup();
    this.createComputerPopup();
  }

  update(time: number, deltaTime: number) {
    super.update(time, deltaTime);

    this.updatePlayer(deltaTime);

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

    this.isNearLocker = this.player.y === 264 && this.player.x >= 720 && this.player.x <= 800;
    this.updateLockerPopup(this.isNearLocker && !model.isWindowVisible);

    this.isNearRestZone = this.player.y >= 600 && this.player.y <= 748 && this.player.x >= 112 && this.player.x <= 272;
    this.updateRestZonePopup(this.isNearRestZone && !model.isWindowVisible);

    this.isNearVendingMachine = this.player.y === 216 && this.player.x >= 343 && this.player.x <= 433;
    this.updateVendingMachinePopup(this.isNearVendingMachine && !model.isWindowVisible);

    this.isNearComputer = this.player.y === 744 && this.player.x >= 736 && this.player.x <= 752;
    this.updateComputerPopup(this.isNearComputer && !model.isWindowVisible);

    if (this.player.x >= 930) {
      this.finishBreak();
    }

    console.log(this.player.x, this.player.y);
  }

  private createMap() {
    const result = MapLoader.createMap('canteen-map', this);

    this.map = result.map;
    this.collisionLayer = result.collisionLayer;
  }

  private createPlayer() {
    this.player = this.physics.add.sprite(0, 0, 'worker', 19);
    this.player.setScale(WORKER_SIZE_SCALE);
    this.resetPlayerPosition();
  }

  private resetPlayerPosition() {
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

    this.player.setPosition(playerX, playerY);
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

  private finishBreak() {
    model.setScene('Canteen');
    this.resetPlayerPosition();

    model.finishBreak(() => {
      model.setScene('Afternoon');
      this.scene.start('Afternoon');
    });
  }

  private createLockerPopup() {
    const popupX = TILE_SIZE * 12.5;
    const popupY = TILE_SIZE * 1.75;

    this.lockerPopup = this.add.image(popupX, popupY, 'popup');
    this.lockerPopup.setScrollFactor(0);
    this.lockerText = this.add.text(popupX - 86, popupY - 10, 'Otwórz szafkę [E]', {
      fontFamily: 'VT323',
      fontSize: 20,
      color: '#000000',
      stroke: '#dddddd',
      strokeThickness: 2,
    });
    this.lockerText.setScrollFactor(0);

    this.lockerPopup.setVisible(false);
    this.lockerText.setVisible(false);

    this.input.keyboard?.on('keydown-E', () => {
      if (this.isNearLocker) {
        const lunch = new Lunch();

        if (model.worker.hasItem(lunch.getId())) {
          model.showWindow(
            'Szafka',
            'W środku trzymasz lunchbox.\n\n' + '1. Zjedz kupiony lunch [1]\n' + '2. Wyjście [ESC]',
            [lunch.getEatEvent()],
          );
          model.worker.removeItem(lunch); // TODO po evencie!!!!
        } else {
          model.showWindow('Szafka', 'Tutaj zostawiasz swoje rzeczy\ni obiad który możesz kupić\npo pracy');
        }
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
    this.restZoneText = this.add.text(popupX - 86, popupY - 10, 'Wycziluj [E]', {
      fontFamily: 'VT323',
      fontSize: 20,
      color: '#000000',
      stroke: '#dddddd',
      strokeThickness: 2,
    });
    this.restZoneText.setScrollFactor(0);

    this.restZonePopup.setVisible(false);
    this.restZoneText.setVisible(false);

    this.input.keyboard?.on('keydown-E', () => {
      if (this.isNearRestZone) {
        model.showWindow(
          'Strefa czilałtu',
          'Za dużo stresu podczas pracy?\n' + 'Weź trochę wycziluj.\n\n' + '1. Odpocznij [1]\n' + '2. Wyjście [ESC]',
          [new Rest()],
        );
      }
    });
  }

  private updateRestZonePopup(visible: boolean) {
    this.restZonePopup.setVisible(visible);
    this.restZoneText.setVisible(visible);
  }

  private createVendingMachinePopup() {
    const popupX = TILE_SIZE * 5.5;
    const popupY = TILE_SIZE * 1;

    this.vendingMachinePopup = this.add.image(popupX, popupY, 'popup');
    this.vendingMachinePopup.setScrollFactor(0);
    this.vendingMachineText = this.add.text(popupX - 86, popupY - 10, 'Kup przekąskę [E]', {
      fontFamily: 'Pixelify Sans',
      fontSize: 20,
      color: '#000000',
      stroke: '#dddddd',
      strokeThickness: 2,
    });
    this.vendingMachineText.setScrollFactor(0);

    this.vendingMachinePopup.setVisible(false);
    this.vendingMachineText.setVisible(false);

    this.input.keyboard?.on('keydown-E', () => {
      if (this.isNearVendingMachine) {
        model.showWindow(
          'Automat z przekąskami',
          'Nie stać cię na prawdziwy obiad?\nKup sobie przekąskę.\n\n' +
            '1. Kup i zjedz batonika [1]\n' +
            '2. Kup i wypij napój [2]\n' +
            '3. Wyjście [ESC]',
          [new Snack(), new Soda()],
        );
      }
    });
  }

  private updateVendingMachinePopup(visible: boolean) {
    this.vendingMachinePopup.setVisible(visible);
    this.vendingMachineText.setVisible(visible);
  }

  private createComputerPopup() {
    const popupX = TILE_SIZE * 15;
    const popupY = TILE_SIZE * 11;

    this.computerPopup = this.add.image(popupX, popupY, 'popup');
    this.computerPopup.setScrollFactor(0);
    this.computerText = this.add.text(popupX - 86, popupY - 10, 'Zagraj [E]', {
      fontFamily: 'VT323',
      fontSize: 20,
      color: '#000000',
      stroke: '#dddddd',
      strokeThickness: 2,
    });
    this.computerText.setScrollFactor(0);

    this.computerPopup.setVisible(false);
    this.computerText.setVisible(false);

    this.input.keyboard?.on('keydown-E', () => {
      if (this.isNearComputer) {
        model.showWindow(
          'Kantynowy PeCet',
          'Dobry moment na granie?\n\n' +
            '1. Szybkie duo w LoLa [1]\n' +
            '2. Klanówka w CSa [2]\n' +
            '3. Rundka w Tekkena [3]\n' +
            '4. Nie graj w nic [ESC]',
          [new Snack(), new Soda()],
        );
      }
    });
  }

  private updateComputerPopup(visible: boolean) {
    this.computerPopup.setVisible(visible);
    this.computerText.setVisible(visible);
  }
}
