import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV8'; //random event 8

export class EvRand8 extends Event {
  constructor() {
    super(
      id,
      'Spańsko',
      'Uciąłeś sobie drzemkę między regałami,\nmając nadzieję, że szef Cię nie zauważy.\nNiestety, zauważyli Cię koledzy\ni pocichu ojumali cię z hasju',
      new Effect({
        //(-zmęczenie, +stres, +kloc, +mocz)
        fatigue: -15,
        poop: 25,
        stress: 15,
        urine: 25,
        cash: -20,
      }),
    );
  }
}
