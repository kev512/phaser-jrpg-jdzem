import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'SODA';

export class Soda extends Event {
  constructor() {
    super(
      id,
      'Soda',
      '',
      new Effect({
        thirst: -25,
        urine: 15,
      }),
    );
  }
}
