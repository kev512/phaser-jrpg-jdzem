import { Scene, GameObjects } from 'phaser';

export class Intro extends Scene  {
    seagull: GameObjects.Image;

    constructor() {
        super('Intro');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');

        this.seagull = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'seagull');
        this.seagull.setScale(.13);

        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'White Seagul Team Prezentuje...', {
            fontFamily: 'VT323',
            fontSize: 28,
        }).setOrigin(0.5, 0.5);

        const startText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '>> Rozpocznij Grę', {
            fontFamily: 'VT323',
            fontSize: 24,
            color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: startText,
            y: this.cameras.main.centerY + 10,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        startText.setInteractive();
        startText.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
