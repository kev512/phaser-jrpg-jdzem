import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV15'; //random event 15

export class EvRand15 extends Event {
  constructor() {
    super(
      id,
      'Szlachecka krew',
      'Chciałeś zaimponować swoim kolegom\nmagazynierom, że jesteś ze szlachty\n, więc chciałeś im udowodnić, że szlachta nie pracuje. Jednakże twój szef bardzo szybko przypomniał twoje prawdziwe pochodznie wręczająć mopa do czyszczenia podłogi.',
      new Effect({
        //(-reputacja, +zmęczenie)
        reputation: -15,
        fatigue: 20,
      }),
    );
  }
}
