import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV4'; //random event 4

export class EvRand4 extends Event {
  constructor() {
    super(
      id,
      'Randomowy event 4',
      'W trakcie pracy jeden z pracowników zasnął na wózku widłowym i zrzucił szereg regałów z towarem. Szef kazał Ci pomóc w sprzątaniu',
      new Effect({
        //(+zmęczenie, +stres)
        stress: 15,
        fatigue: 25,
      }),
    );
  }
}
