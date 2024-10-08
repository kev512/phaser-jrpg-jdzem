import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'BEER';

export class Beer extends Event {
  constructor() {
    super(
      id,
      'Łojenie browara',
      'Wypiłeś se bronksa (oczywiście 0%).',
      new Effect({
        thirst: -15,
        stress: -30,
        urine: 25,
        beers: -1,
        drunkness: 10,
      }),
    );
  }
}
