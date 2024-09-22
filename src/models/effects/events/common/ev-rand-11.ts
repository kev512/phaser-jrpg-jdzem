import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV11'; //random event 11

export class EvRand11 extends Event {
  constructor() {
    super(
      id,
      'Nowy kolega z magazynu',
      'Okazało się, że też jest fanem klubu WKS Śląsk. Prawilna mordka podzieliła się z tobą swoim batonem proteinowym, ktróy po kryjomu zjedliście za regałem. Poczuliście bardzo romantyczną atmosferę.',
      new Effect({
        //(-głodu, +stes)
        hunger: -15,
        stress: 15,
      }),
    );
  }
}
