import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV1'; 

export class EvRand1 extends Event {
  constructor() {
    super(
      id,
      'Randomowy event 1',
      'Ten Kebab z wczoraj to nie był najlepszy pomysł, wnętrzności',
      new Effect({
        fatigue:15,
        poop:25,
      }),
    );
  }
}