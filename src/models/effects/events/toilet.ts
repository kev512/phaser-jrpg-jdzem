import { MAX_POOP, MAX_URINE } from '../../worker/worker.consts';
import { Effect } from '../effects';
import { Event } from './event';

export const id = 'TOILET';

export class Toilet extends Event {
  constructor() {
    super(
      id,
      'Kibel',
      '',
      new Effect({
        urine: -MAX_URINE,
        poop: -MAX_POOP,
      }),
    );
  }
}
