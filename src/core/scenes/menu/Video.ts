export class Video extends Phaser.Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;

  constructor() {
    super('Video');
  }

  preload() {
    this.load.video('video', 'assets/byle-do-pauzy.m4v');
  }

  create() {
    const intro = this.add.video(640, 360, 'video');

    intro.on('locked', () => {
      let message = this.add
        .text(640, 100, 'Włącz wideo', { font: '32px Courier', color: '#ffffff' })
        .setShadow(1, 1)
        .setOrigin(0.5);

      intro.on('unlocked', () => {
        message.destroy();
      });
    });

    intro.play();

    intro.once('play', () => {
      this.input.on('pointerdown', () => {
        if (intro.isPlaying()) {
          intro.pause();
        } else {
          intro.resume();
        }
      });
    });

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
