export class Canteen extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap;
  tileset: any;

  constructor() {
    super('Canteen');
  }

  create() {
    this.map = this.make.tilemap({
      key: 'map',
      tileWidth: 32,
      tileHeight: 32,
    });
    this.map.addTilesetImage('tiles', 'tiles', 32, 32, 1, 2);

    const layer = this.map.createLayer(0, 'tiles', 0, 0);
    const player = this.add.image(32 + 16, 32 + 16, 'worker');

    this.input?.keyboard?.on('keydown-A', () => {
      const tile = layer?.getTileAtWorldXY(player.x - 32, player.y, true);

      if (tile?.index === 2) {
      } else {
        player.x -= 32;
        player.angle = 180;
      }
    });

    this.input?.keyboard?.on('keydown-D', () => {
      const tile = layer?.getTileAtWorldXY(player.x + 32, player.y, true);

      if (tile?.index === 2) {
      } else {
        player.x += 32;
        player.angle = 0;
      }
    });

    this.input?.keyboard?.on('keydown-W', () => {
      const tile = layer?.getTileAtWorldXY(player.x, player.y - 32, true);

      if (tile?.index === 2) {
      } else {
        player.y -= 32;
        player.angle = -90;
      }
    });

    this.input?.keyboard?.on('keydown-S', () => {
      const tile = layer?.getTileAtWorldXY(player.x, player.y + 32, true);

      if (tile?.index === 2) {
      } else {
        player.y += 32;
        player.angle = 90;
      }
    });
  }
}
