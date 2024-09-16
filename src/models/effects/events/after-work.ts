import { Effect } from '../effects';
import { Event } from './event';

export const id = 'AFTER_WORK';

export class AfterWork extends Event {
  constructor() {
    super(
      id,
      'After work',
      'You survived till the pauza.',
      new Effect({
        hunger: 10,
        thirst: 10,
        urine: 10,
        poop: 10,
        stress: 10,
        fatigue: 10,
      }),
    );
  }
}
