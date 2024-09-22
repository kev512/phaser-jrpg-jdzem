import { Effect } from '../effects';
import { FoodItem } from './food-item';

const id = 'LUNCH_ITEM';

export class Lunch extends FoodItem {
  constructor() {
    super(
      id,
      'Lunch',
      'Zjadłeś lunchboxa',
      new Effect({
        hunger: -50,
        thirst: -50,
        poop: 20,
        urine: 15,
      }),
      40,
    );
  }
}
