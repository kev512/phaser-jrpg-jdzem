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
  npc1: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  npc2: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  npc3: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

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
    super.createActionsPopup();

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

    this.npc1 = this.physics.add.sprite(501, 258, 'npc1');
    this.npc1.setScale(WORKER_SIZE_SCALE);
    this.anims.create({
      key: 'npc1-anim',
      frames: this.anims.generateFrameNumbers('npc1'),
      frameRate: 5,
      repeat: -1,
    });
    this.npc1.play('npc1-anim');

    this.npc2 = this.physics.add.sprite(121, 475, 'npc2');
    this.npc2.setScale(WORKER_SIZE_SCALE);
    this.anims.create({
      key: 'npc2-anim',
      frames: this.anims.generateFrameNumbers('npc2', { start: 1, end: 4 }),
      frameRate: 5,
      repeat: -1,
    });
    this.npc2.play('npc2-anim');

    this.npc3 = this.physics.add.sprite(264, 619, 'npc2');
    this.npc3.setScale(WORKER_SIZE_SCALE);
    this.anims.create({
      key: 'npc3-anim',
      frames: this.anims.generateFrameNumbers('npc2', { start: 6, end: 11 }),
      frameRate: 5,
      repeat: -1,
    });
    this.npc3.play('npc3-anim');
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
          'Stołówka',
          'Dzisiaj w bufecie? Zupa z wczoraj,\nkotlet z przedwczoraj, ale przynajmniej\nherbata świeża!"\n\n' +
            '1. Kup i zjedz danie dnia [1]\n' +
            '2. Wyjście [ESC]',
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
