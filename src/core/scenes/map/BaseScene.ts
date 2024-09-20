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

  constructor(name: string) {
    super(name);
  }

  createLabels() {
    this.hunger = this.createLabel(916, 32);
    this.thirst = this.createLabel(916, 32 * 2);
    this.urine = this.createLabel(916, 32 * 3);
    this.poop = this.createLabel(916, 32 * 4);
    this.stress = this.createLabel(916, 32 * 5);
    this.fatigue = this.createLabel(916, 32 * 6);
    this.drunkness = this.createLabel(916, 32 * 7);
  }

  updateLabels() {
    this.hunger.setText('Głód: ' + model.worker.getHunger());
    this.thirst.setText('Pragnienie: ' + model.worker.getThirst());
    this.urine.setText('Pęcherz: ' + model.worker.getUrine());
    this.poop.setText('Dwójeczka: ' + model.worker.getPoop());
    this.stress.setText('Stres: ' + model.worker.getStress());
    this.fatigue.setText('Zmęczenie: ' + model.worker.getFatigue());
    this.drunkness.setText('Upojenie: ' + model.worker.getDrunkness());
  }

  private createLabel(x: number, y: number) {
    const label = this.add.text(x, y, '', {
      fontFamily: 'Pixelify Sans',
      fontSize: 28,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    });

    label.setScrollFactor(0);

    return label;
  }
}
