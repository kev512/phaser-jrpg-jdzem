import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV0'; //random event 0

export class EvRand0 extends Event {
  constructor() {
    super(
      id,
      'Reprymenda',
      'Dostałeś ochrzan od szefa\nbo zauważył, że nie starałeś się\nw trakcie pracy. Poczułeś jak ze stresu\nkrecik zapukał w taborecik.',
      new Effect({
        stress:15,
        poop:25,
      }),
    );
  }
}