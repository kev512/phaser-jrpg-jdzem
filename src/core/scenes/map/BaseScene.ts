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

  constructor(name: string) {
    super(name);
  }

  createLabels() {
    this.hunger = this.add.text(916, 32, '', {
      fontSize: '18px',
      stroke: '#ffffff',
    });
    this.hunger.setScrollFactor(0);

    this.thirst = this.add.text(916, 32 * 2, '', {
      fontSize: '18px',
      stroke: '#ffffff',
    });
    this.thirst.setScrollFactor(0);

    this.urine = this.add.text(916, 32 * 3, '', {
      fontSize: '18px',
      stroke: '#ffffff',
    });
    this.urine.setScrollFactor(0);

    this.poop = this.add.text(916, 32 * 4, '', {
      fontSize: '18px',
      stroke: '#ffffff',
    });
    this.poop.setScrollFactor(0);
  }

  updateLabels() {
    this.hunger.setText('Głód: ' + model.worker.getHunger());
    this.thirst.setText('Pragnienie: ' + model.worker.getThirst());
    this.urine.setText('Pęcherz: ' + model.worker.getUrine());
    this.poop.setText('Dwójeczka: ' + model.worker.getPoop());
  }
}
