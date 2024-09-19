import { isNull } from 'lodash';
import canteenJson from '../../public/assets/canteen.json';

export class MapLoader {
  constructor() {}

  static createMap(scene: Phaser.Scene, name: 'Canteen') {
    let json: TiledJson;

    if (name === 'Canteen') {
      json = canteenJson;
    } else {
      throw new Error('Incorrect name');
    }

    return this._createMap(scene, json);
  }

  private static _createMap(scene: Phaser.Scene, json: TiledJson) {
    const map = scene.make.tilemap({
      data: json.layers.map((layer) => layer.data),
      tileWidth: 16,
      tileHeight: 16,
    });

    json.layers.forEach((item, index) => {
      const name = item.name;
      const tiles = map.addTilesetImage(name);

      if (isNull(tiles)) {
        throw new Error(`Tileset ${name} is null`);
      }

      map.createLayer(index, tiles, 0, 0);
    });

    return map;
  }
}
