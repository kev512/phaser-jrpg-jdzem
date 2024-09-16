import { Effect } from '../effects';
import { Event } from './event';

export const id = 'AFTER_WORK';

export class AfterWork extends Event {
  constructor() {
    super(
      id,
      'Popracowałeś',
      'Przetrwałeś do pauzy.',
      new Effect({
        hunger: 30,
        thirst: 35,
        urine: 40,
        poop: 20,
        stress: 15,
        fatigue: 30,
      }),
    );
  }
}
