import { isNull } from 'lodash';

export const COLLISION_LAYER_NUMBER = 0;
export const WALLS_LAYER_NUMBER = 1;
export const FLOOR_LAYER_NUMBER = 2;
export const INTERIOR_LAYER_NUMBER = 3;
export const OBJECTS_LAYER_NUMBER = 4;
export const CEILING_LAYER_NUMBER = 5;

export class MapLoader {
  constructor() {}

  static createMap(mapKey: 'canteen-map' | 'buffet-map', scene: Phaser.Scene) {
    const map = scene.make.tilemap({ key: mapKey });

    const collisionTilesetImage = map.addTilesetImage('collision-tileset');
    const wallsTilesetImage = map.addTilesetImage('walls-tileset');
    const interiorTilesetImage = map.addTilesetImage('interiors-tileset');

    if (isNull(collisionTilesetImage)) {
      throw new Error('Collision tileset is null');
    }

    if (isNull(wallsTilesetImage)) {
      throw new Error('Walls tileset is null');
    }

    if (isNull(interiorTilesetImage)) {
      throw new Error('Interior tileset is null');
    }

    const collisionLayer = map.createLayer(COLLISION_LAYER_NUMBER, collisionTilesetImage, 0, 0);

    if (isNull(collisionLayer)) {
      throw new Error('Collision layer is null');
    }

    collisionLayer.setCollision(3632); // TODO

    map.createLayer(WALLS_LAYER_NUMBER, wallsTilesetImage, 0, 0);

    map.createLayer(FLOOR_LAYER_NUMBER, interiorTilesetImage, 0, 0);

    map.createLayer(INTERIOR_LAYER_NUMBER, interiorTilesetImage, 0, 0);

    map.createLayer(OBJECTS_LAYER_NUMBER, interiorTilesetImage, 0, 0);

    map.createLayer(CEILING_LAYER_NUMBER, wallsTilesetImage, 0, 0);

    return {
      map,
      collisionLayer,
    };
  }
}
