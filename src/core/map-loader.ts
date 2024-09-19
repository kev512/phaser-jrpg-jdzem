import { isNull } from 'lodash';

export class MapLoader {
  constructor() {}

  static createMap(mapKey: 'canteen-map' | 'buffet-map', scene: Phaser.Scene) {
    const map = scene.make.tilemap({ key: mapKey });

    const wallsTilesetImage = map.addTilesetImage('walls-tileset');
    const interiorTilesetImage = map.addTilesetImage('interiors-tileset');

    if (isNull(wallsTilesetImage)) {
      throw new Error("Walls tileset is null");
    }

    if (isNull(interiorTilesetImage)) {
      throw new Error("Interior tileset is null");
    }

    const walls = map.createLayer(0, wallsTilesetImage, 0, 0);
    const floor = map.createLayer(1, wallsTilesetImage, 0, 0);
    const interior = map.createLayer(2, wallsTilesetImage, 0, 0);
    const objects = map.createLayer(3, wallsTilesetImage, 0, 0);
    const ceiling = map.createLayer(4, wallsTilesetImage, 0, 0);

    return map;
  }
}
