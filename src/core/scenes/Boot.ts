import { Scene } from 'phaser';

export class Boot extends Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
    this.load.image('background', 'assets/bg-main-menu-example.png');

    this.load.image('background', 'path_to_background.png');
    this.load.spritesheet('buttonBorder', 'path_to_your_spritesheet.png', {
      frameWidth: 64,
      frameHeight: 64 
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}
