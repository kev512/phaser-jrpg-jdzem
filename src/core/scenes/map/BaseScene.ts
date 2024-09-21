import { isNull } from 'lodash';
import { model } from '../../../main';
import { Timer } from '../Timer';
import { MAP_BOUNDARY } from '../../consts';

export abstract class BaseScene extends Phaser.Scene {
  protected map: Phaser.Tilemaps.Tilemap;
  protected player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  protected collisionLayer: Phaser.Tilemaps.TilemapLayer;

  private timerObject: Timer;
  protected timer: Phaser.GameObjects.Text;
  protected countdown: Phaser.GameObjects.Text;
  protected delayTime: Phaser.GameObjects.Text;
  private delayText: Phaser.GameObjects.Text;

  protected hunger: Phaser.GameObjects.Text;
  protected thirst: Phaser.GameObjects.Text;
  protected urine: Phaser.GameObjects.Text;
  protected poop: Phaser.GameObjects.Text;
  protected stress: Phaser.GameObjects.Text;
  protected fatigue: Phaser.GameObjects.Text;
  protected drunkness: Phaser.GameObjects.Text;

  protected cash: Phaser.GameObjects.Text;
  protected diapers: Phaser.GameObjects.Text;
  protected beers: Phaser.GameObjects.Text;
  protected smokes: Phaser.GameObjects.Text;

  protected window: Phaser.GameObjects.Image;
  protected windowTitle: Phaser.GameObjects.Text;
  protected windowDescription: Phaser.GameObjects.Text;

  constructor(name: string) {
    super(name);
  }

  preload() {
    this.input.keyboard?.on('keydown-ESC', () => {
      model.window.visible = false;
    });

    this.input.keyboard?.on('keydown-ONE', () => {
      if (model.window.visible && !isNull(model.window.options[0])) {
        model.emit(model.window.options[0]);
      }
    });

    this.input.keyboard?.on('keydown-TWO', () => {
      if (model.window.visible && !isNull(model.window.options[1])) {
        model.emit(model.window.options[1]);
      }
    });

    this.input.keyboard?.on('keydown-THREE', () => {
      if (model.window.visible && !isNull(model.window.options[2])) {
        model.emit(model.window.options[2]);
      }
    });
  }

  create() {
    this.timerObject = model.timerObject;
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    this.timerObject.update(delta);

    this.updateLabels();
  }

  // TODO: Decrease remaining time after event is done
  // decreaseTime() {
  //   this.timerObject.adjustTime(-10);
  // }

  setCameraBounds() {
    this.cameras.main.setBounds(MAP_BOUNDARY.x, MAP_BOUNDARY.y, MAP_BOUNDARY.width, MAP_BOUNDARY.height);
  }

  createLabels() {
    const x = 945;
    const y = 32;

    this.timer = this.createStatLabel(x, y);
    this.countdown = this.createStatLabel(x, y * 2);
    this.countdown.setScale(2.4);

    this.delayText = this.add
      .text(x, 235, 'SPÓŹNIENIE: ', {
        fontFamily: 'VT323',
        fontSize: 28,
        color: '#ff0000',
        stroke: '#3A3A50',
        strokeThickness: 2,
      })
      .setVisible(false);
    this.delayTime = this.createStatLabel(x + 135, y * 4.4);
    this.delayTime.setVisible(false);

    this.hunger = this.createStatLabel(x, y * 6);
    this.thirst = this.createStatLabel(x, y * 7);
    this.urine = this.createStatLabel(x, y * 8);
    this.poop = this.createStatLabel(x, y * 9);
    this.stress = this.createStatLabel(x, y * 10);
    this.fatigue = this.createStatLabel(x, y * 11);
    this.drunkness = this.createStatLabel(x, y * 12);

    this.cash = this.createStatLabel(x, y * 14);
    this.diapers = this.createStatLabel(x, y * 15);
    this.beers = this.createStatLabel(x, y * 16);
    this.smokes = this.createStatLabel(x, y * 17);
  }

  createWindow() {
    this.window = this.add.image(-1000, 0, 'window');
    this.window.setScrollFactor(0);

    this.windowTitle = this.createLabel(270, 256);
    this.windowTitle.setToTop();
    this.windowDescription = this.add.text(270, 256 + 32, '', {
      fontFamily: 'Pixelify Sans',
      fontSize: 20,
      color: '#dddddd',
      stroke: '#333333',
      strokeThickness: 2,
    });
    this.windowDescription.setScrollFactor(0);
    this.windowDescription.setToTop();
  }

  updateLabels() {
    this.timer.setText('Koniec przerwy:');
    this.timer.setScale(1.2);
    this.countdown.setText(this.timerObject.getFormattedTime());

    if (this.timerObject.isTimeUp()) {
      const delay = this.timerObject.getDelayFormattedTime();
      this.delayTime.setText(delay);
      this.delayTime.setVisible(true);
      this.delayText.setVisible(true);

      this.delayText.setAlpha(Math.abs(Math.sin(this.time.now / 500)));
    } else {
      this.delayTime.setVisible(false);
      this.delayText.setVisible(false);
      this.delayText.setAlpha(1);
    }

    this.hunger.setText('Głód: ' + model.worker.getHunger() + ' / 100');
    this.thirst.setText('Pragnienie: ' + model.worker.getThirst() + ' / 100');
    this.urine.setText('Pęcherz: ' + model.worker.getUrine() + ' / 100');
    this.poop.setText('Dwójeczka: ' + model.worker.getPoop() + ' / 100');
    this.stress.setText('Stres: ' + model.worker.getStress() + ' / 100');
    this.fatigue.setText('Zmęczenie: ' + model.worker.getFatigue() + ' / 100');
    this.drunkness.setText('Upojenie: ' + model.worker.getDrunkness() + ' / 100');

    this.cash.setText('Kasa: ' + model.worker.getStress());
    this.diapers.setText('Pieluchy: ' + model.worker.getFatigue());
    this.beers.setText('Bronksy: ' + model.worker.getDrunkness());
    this.smokes.setText('Fajki: ' + model.worker.getSmokes());
  }

  updateWindow() {
    if (!model.window.visible) {
      this.window.setPosition(-1000, 0, 0, 0);
      this.windowTitle.setText('');
      this.windowDescription.setText('');
    } else {
      this.window.setPosition(432, 345, 400, 238);
      this.windowTitle.setText(model.window.title);
      this.windowDescription.setText(model.window.description);
    }
  }

  updatePlayer(deltaTime: number) {
    const { worker } = model;
    const speed = worker.getSpeed() * deltaTime;

    this.player.body.setVelocity(0);

    if (model.window.visible) {
      return;
    }

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
  }

  private createLabel(x: number, y: number) {
    const label = this.add.text(x, y, '', {
      fontFamily: 'VT323',
      fontSize: 28,
      color: '#ffffff',
      stroke: '#333333',
      strokeThickness: 2,
    });

    label.setScrollFactor(0);

    return label;
  }

  private createStatLabel(x: number, y: number) {
    const label = this.add.text(x, y, '', {
      fontFamily: 'VT323',
      fontSize: 28,
      color: '#3A3A50',
    });

    label.setScrollFactor(0);

    return label;
  }
}
