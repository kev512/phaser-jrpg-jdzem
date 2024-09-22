import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV7'; //random event 7

export class EvRand7 extends Event {
  constructor() {
    super(
      id,
      'Spańsko',
      'Uciąłeś sobie drzemkę między regałami, mając nadzieję, że szef Cię nie zauważy.',
      new Effect({
        //(-zmęczenie, +stres, +kloc, +mocz)
        fatigue: -15,
        poop: 25,
        stress: 15,
        urine: 25,
      }),
    );
  }
}
