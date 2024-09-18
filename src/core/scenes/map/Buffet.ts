import { isNull } from 'lodash';
import { MAP_BOUNDARY, TILE_SIZE } from '../../consts';
import { model } from '../../../main';

export class Buffet extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap;
  tileset: any;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  debugGraphics: Phaser.GameObjects.Graphics;
  showDebug: boolean;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  helpText: Phaser.GameObjects.Text;
  layer: Phaser.Tilemaps.TilemapLayer | null;

  constructor() {
    super('Buffet');
  }

  create() {
    this.createMap();

    this.createAnimations();

    this.createPlayer();

    this.addCollision();

    this.cameras.main.setBounds(
      MAP_BOUNDARY.x,
      MAP_BOUNDARY.y,
      MAP_BOUNDARY.width,
      MAP_BOUNDARY.height,
    );

    this.debugGraphics = this.add.graphics();

    if (isNull(this.input.keyboard)) {
      throw new Error('Keyboard is null');
    }

    this.input.keyboard.on('keydown-C', () => {
      this.showDebug = !this.showDebug;
      this.drawDebug();
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.helpText = this.add.text(16, 16, this.getHelpMessage(), {
      fontSize: '18px',
      stroke: '#ffffff',
    });

    this.helpText.setScrollFactor(0);
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

    if (this.player.y >= 927) {
      if (this.player.x >= 736 && this.player.x <= 800) {
        this.starCanteenScene();
      }
    }
  }

  private createMap() {
    this.map = this.make.tilemap({
      key: 'buffet',
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });
    const tileset = this.map.addTilesetImage('tiles');

    if (isNull(tileset)) {
      throw 'Tileset is null';
    }

    this.layer = this.map.createLayer(0, tileset, 0, 0);

    if (isNull(this.layer)) {
      throw 'Layer is null';
    }

    //  TODO
    this.map.setCollisionBetween(54, 83);
  }

  private createPlayer() {
    const playerX = 768;
    const playerY = 925;

    this.player = this.physics.add.sprite(playerX, playerY, 'worker', 1);
  }

  private addCollision() {
    if (isNull(this.layer)) {
      throw new Error('Layer is null');
    }

    this.physics.add.collider(this.player, this.layer);
  }

  private createAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('worker', { start: 8, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('worker', { start: 1, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('worker', { start: 11, end: 13 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('worker', { start: 4, end: 6 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  private drawDebug() {
    this.debugGraphics.clear();

    if (this.showDebug) {
      this.map.renderDebug(this.debugGraphics, {
        tileColor: null, // Non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Colliding face edges
      });
    }

    this.helpText.setText(this.getHelpMessage());
  }

  private getHelpMessage() {
    return `Arrow keys to move.\nPress "C" to toggle debug visuals: ${this.showDebug ? 'on' : 'off'}`;
  }

  private starCanteenScene() {
    this.scene.start('Canteen');
    model.setScene('Canteen');
  }
}
