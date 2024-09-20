import { model } from '../../../main';
import { Timer } from '../Timer';

export abstract class BaseScene extends Phaser.Scene {
  protected map: Phaser.Tilemaps.Tilemap;
  protected player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  protected collisionLayer: Phaser.Tilemaps.TilemapLayer;

  protected timer: Phaser.GameObjects.Text;
  protected countdown: Phaser.GameObjects.Text;
  private timerObject: Timer;

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

  createLabels() {
    const x = 932;
    const y = 32;

    this.timer = this.createLabel(x, y);
    this.countdown = this.createLabel(x, y * 2);
    this.countdown.setScale(2);

    this.hunger = this.createLabel(x, y * 5);
    this.thirst = this.createLabel(x, y * 6);
    this.urine = this.createLabel(x, y * 7);
    this.poop = this.createLabel(x, y * 8);
    this.stress = this.createLabel(x, y * 9);
    this.fatigue = this.createLabel(x, y * 10);
    this.drunkness = this.createLabel(x, y * 11);

    this.cash = this.createLabel(x, y * 13);
    this.diapers = this.createLabel(x, y * 14);
    this.beers = this.createLabel(x, y * 15);
    this.smokes = this.createLabel(x, y * 16);
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
    this.countdown.setText(this.timerObject.getFormattedTime());
    console.log('Formatted time:', this.timerObject.getFormattedTime());

    this.hunger.setText('Głód: ' + model.worker.getHunger() + ' / 100');
    this.thirst.setText('Pragnienie: ' + model.worker.getThirst() + ' / 100');
    this.urine.setText('Pęcherz: ' + model.worker.getUrine() + ' / 100');
    this.poop.setText('Dówjeczka: ' + model.worker.getPoop() + ' / 100');
    this.stress.setText('Stres: ' + model.worker.getStress() + ' / 100');
    this.fatigue.setText('Zmęczenie: ' + model.worker.getFatigue() + ' / 100');
    this.drunkness.setText(
      'Upojenie: ' + model.worker.getDrunkness() + ' / 100',
    );

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

  updatePlayer() {
    const { worker } = model;
    const speed = worker.getSpeed();

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
      fontFamily: 'Pixelify Sans',
      fontSize: 28,
      color: '#ffffff',
      stroke: '#333333',
      strokeThickness: 2,
    });

    label.setScrollFactor(0);

    return label;
  }
}
