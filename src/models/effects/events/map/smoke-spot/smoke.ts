import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'SMOKE';

export class Smoke extends Event {
  constructor() {
    super(
      id,
      'Palenie',
      '',
      new Effect({
        stress: -40,
        poop: 5,
        smokes: -1,
      }),
    );
  }
}
