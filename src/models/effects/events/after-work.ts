import { MAX_DRUNKNESS, MAX_FATIGUE, MAX_HUNGER, MAX_POOP, MAX_THIRST, MAX_URINE, WAGE } from '../../worker/worker.consts';
import { Effect } from '../effects';
import { Event } from './event';

export const id = 'AFTER_WORK';

export class AfterWork extends Event {
  constructor() {
    super(
      id,
      'Koniec dnia pracy',
      '',
      new Effect({
        hunger: -MAX_HUNGER,
        thirst: -MAX_THIRST,
        urine: -MAX_URINE,
        poop: -MAX_POOP,
        stress: -65,
        fatigue: -MAX_FATIGUE,
        cash: +WAGE,
        reputation: 5,
        drunkness: -MAX_DRUNKNESS,
      }),
    );
  }
}
