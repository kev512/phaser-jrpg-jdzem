import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'BEER';

export class Beer extends Event {
  constructor() {
    super(
      id,
      'Walenie piwa',
      '',
      new Effect({
        thirst: -15,
        stress: -30,
        urine: 25,
        beers: -1,
      }),
    );
  }
}
