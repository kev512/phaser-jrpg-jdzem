import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'SNACK';

export class Snack extends Event {
  constructor() {
    super(
      id,
      'Przekąska',
      'Za wiele to to nie było,\nale zawsze to coś.',
      new Effect({
        hunger: -5,
        poop: 5,
      }),
    );
  }
}
