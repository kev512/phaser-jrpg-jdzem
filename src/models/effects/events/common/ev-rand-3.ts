import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV3'; //random event 3

export class EvRand3 extends Event {
  constructor() {
    super(
      id,
      'Klima padła',
      'Udało Ci się przetrwać zmianę na celująco,\nale niestety AC padło bo twój szef\nnie dopłaca za konserwacje sprzetu w filli.',
      new Effect({
        // (+pragnienie, +zmęczenie)
        thirst: 25,
        fatigue: 15,
      }),
    );
  }
}
