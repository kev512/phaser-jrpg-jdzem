import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV12'; //random event 12

export class EvRand12 extends Event {
  constructor() {
    super(
      id,
      'Odrzywki',
      'Przed pracą sprubowałeś nowych supli.\nNiestety okazało się mieć działanie przeczyszczające.',
      new Effect({
        //(+ kloc, +mocz)
        poop: 15,
        urine: 15,
      }),
    );
  }
}
