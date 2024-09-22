import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV14'; //random event 14

export class EvRand14 extends Event {
  constructor() {
    super(
      id,
      'Respekt na magazynie',
      'Przypomniało Ci się, że obejrzałeś ostanio bardzo śmieszny filmik i poleciłeś go swoim kolegom po fachu.',
      new Effect({
        //(+reputacja, -stres)
        reputation: 15,
        stress: -15,
      }),
    );
  }
}
