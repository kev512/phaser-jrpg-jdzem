import { MAX_URINE } from '../../../../worker/worker.consts';
import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'PISSOIR';

export class Pissoir extends Event {
  constructor() {
    super(
      id,
      'Pisuar',
      'Załatwiłeś potrzebę.',
      new Effect({
        urine: -MAX_URINE,
        minutes: -3,
      }),
    );
  }
}
