import { Effect } from '../effects';
import { Item } from './item';

export abstract class HeadItem extends Item {
  constructor(id: string, name: string, description: string, effect: Effect, price: number) {
    super(id, name, description, effect, price);
  }
}
