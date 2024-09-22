import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV13'; //random event 13

export class EvRand13 extends Event {
  constructor() {
    super(
      id,
      'Klęska żywiołowa',
      'Podczas pracy, na zwenątrz rozpętała się wichura, która zerwała kawałek dachu. Przez co woda wdzierała się na magazyn i utradniała poruszanie po hali',
      new Effect({
        //(+zmęczenia, +głodu)
        fatigue: 15,
        hunger: 15,
      }),
    );
  }
}
