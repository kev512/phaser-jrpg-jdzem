import { MAX_POOP, MAX_URINE } from '../../worker/worker.consts';
import { Effect } from '../effects';
import { Event } from './event';

export const id = 'DIAPER';

export class Diaper extends Event {
  constructor() {
    super(
      id,
      'Użyłeś pieluchy',
      'Wyrzuciłeś z siebie gruzy',
      new Effect({
        urine: -MAX_URINE,
        poop: -MAX_POOP,
      }),
    );
  }
}
