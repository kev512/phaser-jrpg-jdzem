import { Effect } from '../effects';
import { Item } from './item';

const id = 'LUNCH_ITEM';

export class Lunch extends Item {
  constructor() {
    super(
      id,
      'Lunch',
      'Kupiony lunchbox',
      new Effect({
        hunger: -25,
        thirst: -20,
        poop: 25,
        urine: 15,
      }),
      100,
    );
  }
}
