import { model } from '../../../main';

export abstract class BaseScene extends Phaser.Scene {
  protected map: Phaser.Tilemaps.Tilemap;
  protected player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  protected collisionLayer: Phaser.Tilemaps.TilemapLayer;

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

  constructor(name: string) {
    super(name);
  }

  createLabels() {
    const x = 932;
    const y = 32;

    this.hunger = this.createLabel(x, y);
    this.thirst = this.createLabel(x, y * 2);
    this.urine = this.createLabel(x, y * 3);
    this.poop = this.createLabel(x, y * 4);
    this.stress = this.createLabel(x, y * 5);
    this.fatigue = this.createLabel(x, y * 6);
    this.drunkness = this.createLabel(x, y * 7);

    this.cash = this.createLabel(x, y * 9);
    this.diapers = this.createLabel(x, y * 10);
    this.beers = this.createLabel(x, y * 11);
    this.smokes = this.createLabel(x, y * 12);
  }

  updateLabels() {
    this.hunger.setText('Głód: ' + model.worker.getHunger());
    this.thirst.setText('Pragnienie: ' + model.worker.getThirst());
    this.urine.setText('Pęcherz: ' + model.worker.getUrine());
    this.poop.setText('Dwójeczka: ' + model.worker.getPoop());
    this.stress.setText('Stres: ' + model.worker.getStress());
    this.fatigue.setText('Zmęczenie: ' + model.worker.getFatigue());
    this.drunkness.setText('Upojenie: ' + model.worker.getDrunkness());

    this.cash.setText('Kasa: ' + model.worker.getStress());
    this.diapers.setText('Pieluchy: ' + model.worker.getFatigue());
    this.beers.setText('Bronksy: ' + model.worker.getDrunkness());
    this.smokes.setText('Fajki: ' + model.worker.getSmokes());
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

  protected createAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('worker', { start: 12, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('worker', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('worker', { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('worker', { start: 18, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
