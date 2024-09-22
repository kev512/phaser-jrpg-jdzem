import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV10'; //random event 10

export class EvRand10 extends Event {
  constructor() {
    super(
      id,
      'Nagroda',
      'Szef pochwalił Cię za twoją przykładną uwagę.\nW nagrodę szef dał Ci piątaka na przerwe.',
      new Effect({
        //(+zmęczenie, +pieniądze)
        fatigue: -20,
        cash: 5,
      }),
    );
  }
}
