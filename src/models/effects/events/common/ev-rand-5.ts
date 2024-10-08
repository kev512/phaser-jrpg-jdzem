import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV5'; //random event 5

export class EvRand5 extends Event {
  constructor() {
    super(
      id,
      'Wyróżnienie',
      'Szef pochwalił Cię za twoją przykładną uwagę.\nW nagrodę, na twoje barki\nspadło więcej obowiązków.',
      new Effect({
        //(+reputacja, +stres)
        reputation: 15,
        stress: 25,
      }),
    );
  }
}
