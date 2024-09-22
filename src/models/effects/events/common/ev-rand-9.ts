import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV9'; //random event 9

export class EvRand9 extends Event {
  constructor() {
    super(
      id,
      'Spańsko',
      'Uciąłeś sobie drzemkę między regałami,\nmając nadzieję, że szef Cię nie zauważy.\nNiestety, zauważyli Cię koledzy\ni narysowali Ci karniaka na czole',
      new Effect({
        //(-zmęczenie, +stres, +kloc, +mocz, -reputacja)
        fatigue: -15,
        poop: 25,
        stress: 15,
        urine: 25,
        reputation: -20,
      }),
    );
  }
}
