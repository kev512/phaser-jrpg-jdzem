import { Effect } from '../effects';
import { Event } from './event';

export const id = 'SNACK';

export class Snack extends Event {
  constructor() {
    super(
      id,
      'Przekąska',
      'Zjadłeś co nie co.',
      new Effect({
        hunger: -5,
        poop: 5,
      }),
    );
  }
}
