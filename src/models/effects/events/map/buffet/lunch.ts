import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'LUNCH';

export class Lunch extends Event {
  constructor() {
    super(
      id,
      'Lunch',
      '',
      new Effect({
        hunger: -25,
        thirst: -20,
        poop: 25,
        urine: 15,
      }),
    );
  }
}
