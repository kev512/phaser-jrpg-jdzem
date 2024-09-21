import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'TEST';

export class Test extends Event {
  constructor() {
    super(
      id,
      'To jest test',
      'Testowy event',
      new Effect({
        hunger: 10,
        thirst: 5,
        urine: 20,
        poop: 10,
        stress: 5,
        fatigue: 10,
      }),
    );
  }
}
