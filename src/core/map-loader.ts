import { isNull } from 'lodash';

export const WALLS_LAYER_NUMBER = 0;
export const FLOOR_LAYER_NUMBER = 1;
export const INTERIOR_LAYER_NUMBER = 2;
export const OBJECTS_LAYER_NUMBER = 3;
export const CEILING_LAYER_NUMBER = 4;

export class MapLoader {
  constructor() {}

  static createMap(mapKey: 'canteen-map' | 'buffet-map', scene: Phaser.Scene) {
    const map = scene.make.tilemap({ key: mapKey });

    const wallsTilesetImage = map.addTilesetImage('walls-tileset');
    const interiorTilesetImage = map.addTilesetImage('interiors-tileset');

    if (isNull(wallsTilesetImage)) {
      throw new Error('Walls tileset is null');
    }

    if (isNull(interiorTilesetImage)) {
      throw new Error('Interior tileset is null');
    }

    const wallsLayer = map.createLayer(
      WALLS_LAYER_NUMBER,
      wallsTilesetImage,
      0,
      0,
    );
    const floorLayer = map.createLayer(
      FLOOR_LAYER_NUMBER,
      interiorTilesetImage,
      0,
      0,
    );
    const interiorLayer = map.createLayer(
      INTERIOR_LAYER_NUMBER,
      interiorTilesetImage,
      0,
      0,
    );
    const objectsLayer = map.createLayer(
      OBJECTS_LAYER_NUMBER,
      interiorTilesetImage,
      0,
      0,
    );
    const ceilingLayer = map.createLayer(
      CEILING_LAYER_NUMBER,
      wallsTilesetImage,
      0,
      0,
    );

    return {
      map,
      wallsLayer,
      floorLayer,
      interiorLayer,
      objectsLayer,
      ceilingLayer,
    };
  }
}
