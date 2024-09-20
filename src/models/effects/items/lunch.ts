import { Effect } from '../effects';
import { FoodItem } from './food-item';

const id = 'LUNCH_ITEM';

export class Lunch extends FoodItem {
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
