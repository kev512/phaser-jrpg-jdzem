import { isNull } from 'lodash';
import { model } from '../../../main';
import { Rest } from '../../../models/effects/events/map/canteen/rest';
import { Snack } from '../../../models/effects/events/map/canteen/snack';
import { Soda } from '../../../models/effects/events/map/canteen/soda';
import { Lunch } from '../../../models/effects/items/lunch';
import { TILE_SIZE, WORKER_SIZE_SCALE } from '../../consts';
import { MapLoader } from '../../map-loader';
import { BaseScene } from './BaseScene';
import { VideoGameLol } from '../../../models/effects/events/map/canteen/video-games/video-game-lol';
import { VideoGameCS } from '../../../models/effects/events/map/canteen/video-games/video-games-cs';
import { VideoGameTekken } from '../../../models/effects/events/map/canteen/video-games/video-game-tekken';
import { ChatWithBuddies } from '../../../models/effects/events/map/canteen/chat-with-buddies';

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

  chatWithBuddiesPoupup: Phaser.GameObjects.Image;
  chatWithBuddiesText: Phaser.GameObjects.Text;
  isNearchatWithBuddies: boolean = false;

  //static NPCs type declaration
  npc2: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  npc3: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  npc4: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  npc5: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

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
    super.createActionsPopup();

    this.createLockerPopup();
    this.createRestZonePopup();
    this.createVendingMachinePopup();
    this.createComputerPopup();
    this.createChatWithBuddies();
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

    this.isNearchatWithBuddies =
      this.player.y >= 320 && this.player.x >= 210 && this.player.y <= 465 && this.player.x <= 501;
    this.updateChatWithBuddies(this.isNearchatWithBuddies && !model.isWindowVisible);

    if (this.player.x >= 930) {
      if (model.worker.isCriticalState()) {
        model.showWindow('Załatw potrzeby', 'Nie możesz wrócić do pracy\nw takim stanie!\n\n1. Faktycznie [ESC]');
        this.player.setX(920);
      } else {
        this.finishBreak();
      }
    }
  }

  private createMap() {
    const result = MapLoader.createMap('canteen-map', this);

    this.map = result.map;
    this.collisionLayer = result.collisionLayer;

    this.npc2 = this.physics.add.sprite(504, 380, 'npc2');
    this.npc2.setScale(WORKER_SIZE_SCALE);
    this.anims.create({
      key: 'npc2-anim-buffet',
      frames: this.anims.generateFrameNumbers('npc2', { start: 6, end: 11 }),
      frameRate: 5,
      repeat: -1,
    });
    this.npc2.play('npc2-anim-buffet');

    this.npc3 = this.physics.add.sprite(217, 335, 'npc3');
    this.npc3.setScale(WORKER_SIZE_SCALE);
    this.anims.create({
      key: 'npc3-anim-buffet',
      frames: this.anims.generateFrameNumbers('npc3'),
      frameRate: 5,
      repeat: -1,
    });
    this.npc3.play('npc3-anim-buffet');

    this.npc4 = this.physics.add.sprite(316, 427, 'npc4');
    this.npc4.setScale(WORKER_SIZE_SCALE);
    this.anims.create({
      key: 'npc4-anim-buffet',
      frames: this.anims.generateFrameNumbers('npc4', { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });
    this.npc4.play('npc4-anim-buffet');

    this.npc5 = this.physics.add.sprite(404, 427, 'npc5');
    this.npc5.setScale(WORKER_SIZE_SCALE);
    this.anims.create({
      key: 'npc5-anim-buffet',
      frames: this.anims.generateFrameNumbers('npc5', { start: 6, end: 11 }),
      frameRate: 5,
      repeat: -1,
    });
    this.npc5.play('npc5-anim-buffet');
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

    model.finishBreak(
      () => {
        model.setScene('Afternoon');
        this.scene.start('Afternoon');
      },
      () => {
        model.setScene('GameOver');
        this.scene.start('GameOver');
      },
    );
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
            [
              () => {
                model.worker.removeItem(new Lunch());
              },
            ],
          );
        } else {
          model.showWindow('Szafka', 'Tutaj zostawiasz swoje rzeczy\ni obiad który możesz kupić\npo pracy', [], []);
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
          'Praca na magazynie potrafi wykończyć\nczłowieka. Ta kanapa to chyba jedyna\nrzecz, która mnie tu jeszcze trzyma....\nno, może jeszcze poza umową o pracę.\n\n' +
            '1. Odpocznij [1]\n' +
            '2. Wyjście [ESC]',
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
          [new VideoGameLol(), new VideoGameCS(), new VideoGameTekken()],
        );
      }
    });
  }

  private updateComputerPopup(visible: boolean) {
    this.computerPopup.setVisible(visible);
    this.computerText.setVisible(visible);
  }

  private createChatWithBuddies() {
    const popupX = 350; //TILE_SIZE * 4;
    const popupY = 250; //TILE_SIZE * 10;

    this.chatWithBuddiesPoupup = this.add.image(popupX, popupY, 'popup');
    this.chatWithBuddiesPoupup.setScrollFactor(0);
    this.chatWithBuddiesText = this.add.text(popupX - 86, popupY - 10, 'Pogadaj z ziomkamki [E]', {
      fontFamily: 'VT323',
      fontSize: 20,
      color: '#000000',
      stroke: '#dddddd',
      strokeThickness: 2,
    });
    this.chatWithBuddiesText.setScrollFactor(0);

    this.chatWithBuddiesPoupup.setVisible(false);
    this.chatWithBuddiesText.setVisible(false);

    this.input.keyboard?.on('keydown-E', () => {
      if (this.isNearchatWithBuddies) {
        model.showWindow(
          'Strefa ziomeczków',
          'Szef was zadręcza?\nRoboty jest po pachy?\n' +
            'Pogadaj z ziomeczkami.\n\n' +
            '1. Pogadaj [1]\n' +
            '2. Wyjście [ESC]',
          [new ChatWithBuddies()],
        );
      }
    });
  }

  private updateChatWithBuddies(visible: boolean) {
    this.chatWithBuddiesPoupup.setVisible(visible);
    this.chatWithBuddiesText.setVisible(visible);
  }
}
