import { isNull } from 'lodash';
import { model } from '../../../main';
import { Timer } from '../Timer';
import { MAP_BOUNDARY } from '../../consts';

export abstract class BaseScene extends Phaser.Scene {
  protected map: Phaser.Tilemaps.Tilemap;
  protected player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  protected collisionLayer: Phaser.Tilemaps.TilemapLayer;
  protected statsBar: Phaser.GameObjects.Image;
  protected subStatsBar: Phaser.GameObjects.Image;

  protected hungerBarBg: Phaser.GameObjects.Graphics;
  protected hungerBar: Phaser.GameObjects.Graphics;
  protected hunger: Phaser.GameObjects.Text;
  protected hungerStatsUnit: Phaser.GameObjects.Image;

  protected thirstBarBg: Phaser.GameObjects.Graphics;
  protected thirstBar: Phaser.GameObjects.Graphics;
  protected thirst: Phaser.GameObjects.Text;
  protected thirstStatsUnit: Phaser.GameObjects.Image;

  protected urineBarBg: Phaser.GameObjects.Graphics;
  protected urineBar: Phaser.GameObjects.Graphics;
  protected urine: Phaser.GameObjects.Text;
  protected urineStatsUnit: Phaser.GameObjects.Image;

  protected poopBarBg: Phaser.GameObjects.Graphics;
  protected poopBar: Phaser.GameObjects.Graphics;
  protected poop: Phaser.GameObjects.Text;
  protected poopStatsUnit: Phaser.GameObjects.Image;

  protected stressBarBg: Phaser.GameObjects.Graphics;
  protected stressBar: Phaser.GameObjects.Graphics;
  protected stress: Phaser.GameObjects.Text;
  protected stressStatsUnit: Phaser.GameObjects.Image;

  protected fatigueBarBg: Phaser.GameObjects.Graphics;
  protected fatigueBar: Phaser.GameObjects.Graphics;
  protected fatigue: Phaser.GameObjects.Text;
  protected fatigueStatsUnit: Phaser.GameObjects.Image;

  protected drunknessBarBg: Phaser.GameObjects.Graphics;
  protected drunknessBar: Phaser.GameObjects.Graphics;
  protected drunkness: Phaser.GameObjects.Text;
  protected drunknessStatsUnit: Phaser.GameObjects.Image;

  private timerObject: Timer;
  protected timer: Phaser.GameObjects.Text;
  protected countdown: Phaser.GameObjects.Text;
  protected delayTime: Phaser.GameObjects.Text;
  private delayText: Phaser.GameObjects.Text;

  protected coins: Phaser.GameObjects.Image;
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

    this.statsBar = this.add.image(1053, 430, 'stats-bar');
    this.statsBar.setScale(1, 0.945);
    this.timer = this.createStatLabel(x, y - 20);
    this.countdown = this.createStatLabel(x, 44);
    this.countdown.setScale(2.4);

    this.delayText = this.add
      .text(x, 215, 'SPÓŹNIENIE: ', {
        fontFamily: 'VT323',
        fontSize: 28,
        color: '#ff0000',
        stroke: '#3A3A50',
        strokeThickness: 2,
      })
      .setVisible(false);
    this.delayTime = this.createStatLabel(x + 135, 120.8);
    this.delayTime.setVisible(false);

    this.hungerStatsUnit = this.add.image(1057, 290, 'stats-unit');
    this.hunger = this.createStatLabel(x, 172);
    this.hunger.setScale(0.8);
    this.hungerBarBg = this.makeBar(x, 295.2, 0xaeb1c0);
    this.hungerBar = this.makeBar(x, y * 295.2, 0x568d61);
    this.setBarValue(this.hungerBar, model.worker.getHunger());

    this.thirstStatsUnit = this.add.image(1057, 360, 'stats-unit');
    this.thirst = this.createStatLabel(x, 242.4);
    this.thirst.setScale(0.8);
    this.thirstBarBg = this.makeBar(x, 365.6, 0xaeb1c0);
    this.thirstBar = this.makeBar(x, 365.6, 0x568d61);
    this.setBarValue(this.thirstBar, model.worker.getThirst());

    this.urineStatsUnit = this.add.image(1057, 430, 'stats-unit');
    this.urine = this.createStatLabel(x, 312.8);
    this.urineBarBg = this.makeBar(x, 436, 0xaeb1c0);
    this.urineBar = this.makeBar(x, 436, 0x568d61);
    this.urine.setScale(0.8);

    this.poopStatsUnit = this.add.image(1057, 500, 'stats-unit');
    this.poop = this.createStatLabel(x, 383.2);
    this.poopBarBg = this.makeBar(x, 506.4, 0xaeb1c0);
    this.poopBar = this.makeBar(x, 506.4, 0x568d61);
    this.poop.setScale(0.8);

    this.stressStatsUnit = this.add.image(1057, 570, 'stats-unit');
    this.stress = this.createStatLabel(x, 453.6);
    this.stressBarBg = this.makeBar(x, 576.8, 0xaeb1c0);
    this.stressBar = this.makeBar(x, 576.8, 0x568d61);
    this.stress.setScale(0.8);

    this.fatigueStatsUnit = this.add.image(1057, 640, 'stats-unit');
    this.fatigue = this.createStatLabel(x, 524);
    this.fatigueBarBg = this.makeBar(x, 647.2, 0xaeb1c0);
    this.fatigueBar = this.makeBar(x, 647.2, 0x568d61);
    this.fatigue.setScale(0.8);

    this.drunknessStatsUnit = this.add.image(1057, 710, 'stats-unit');
    this.drunkness = this.createStatLabel(x, 594.4);
    this.drunknessBarBg = this.makeBar(x, 717.6, 0xaeb1c0);
    this.drunknessBar = this.makeBar(x, 717.6, 0x568d61);
    this.drunkness.setScale(0.8);

    this.subStatsBar = this.add.image(1055, 810, 'button-bg');
    this.subStatsBar.setScale(0.47, 0.58);

    this.coins = this.add.image(950, 792, 'coins');
    this.coins.setScale(0.09);
    this.cash = this.createStatLabel(970, 684);
    this.cash.setScale(0.8);

    // this.diapers = this.createStatLabel(x, y * 18);
    // this.beers = this.createStatLabel(x, y * 19);
    // this.smokes = this.createStatLabel(x, y * 20);
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
    this.setBarValue(this.hungerBar, model.worker.getHunger());

    this.thirst.setText('Pragnienie: ' + model.worker.getThirst() + ' / 100');
    this.setBarValue(this.thirstBar, model.worker.getThirst());

    this.urine.setText('Pęcherz: ' + model.worker.getUrine() + ' / 100');
    this.setBarValue(this.urineBar, model.worker.getUrine());

    this.poop.setText('Dwójeczka: ' + model.worker.getPoop() + ' / 100');
    this.setBarValue(this.poopBar, model.worker.getPoop());

    this.stress.setText('Stres: ' + model.worker.getStress() + ' / 100');
    this.setBarValue(this.stressBar, model.worker.getStress());

    this.fatigue.setText('Zmęczenie: ' + model.worker.getFatigue() + ' / 100');
    this.setBarValue(this.fatigueBar, model.worker.getFatigue());

    this.drunkness.setText('Upojenie: ' + model.worker.getDrunkness() + ' / 100');
    this.setBarValue(this.drunknessBar, model.worker.getFatigue());

    this.cash.setText(`${model.worker.getCash()}`);

    // this.diapers.setText('Pieluchy: ' + model.worker.getFatigue());
    // this.beers.setText('Bronksy: ' + model.worker.getDrunkness());
    // this.smokes.setText('Fajki: ' + model.worker.getSmokes());
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

  makeBar(x: number, y: number, color: number): Phaser.GameObjects.Graphics {
    let bar = this.add.graphics();
    bar.fillStyle(color, 1);
    bar.fillRect(0, 0, 225, 13);
    bar.x = x;
    bar.y = y;
    return bar;
  }

  setBarValue(bar: Phaser.GameObjects.Graphics, percentage: number) {
    let color = 0x568d61;

    if (percentage > 75) {
      color = 0xec5555;
    } else if (percentage > 50) {
      color = 0xcc9741;
    } else if (percentage > 25) {
      color = 0xdfc950;
    }

    bar.clear();

    bar.fillStyle(color, 1);
    bar.fillRect(0, 0, 225, 13);

    bar.scaleX = percentage / 100;
  }
}
