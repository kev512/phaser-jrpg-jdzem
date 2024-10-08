import { MAX_FATIGUE, MAX_HUNGER, MAX_POOP, MAX_STRESS, MAX_THIRST, MAX_URINE } from '../../worker/worker.consts';
import { Effect } from '../effects';
import { Event } from './event';

export const id = 'START_GAME';

export class StartGame extends Event {
  constructor() {
    super(
      id,
      'Witaj w zakładowej kantynie',
      'To twoja pierwsza przerwa.\nNajważniejsze to wytrwać i nie wylecieć.\nRobota potrafi być ciężka...\nBYLE DO NASTĘPNEJ PAUZY!',
      new Effect({
        hunger: -MAX_HUNGER,
        thirst: -MAX_THIRST,
        urine: -MAX_URINE,
        poop: -MAX_POOP,
        stress: -MAX_STRESS,
        fatigue: -MAX_FATIGUE,
      }),
    );
  }
}
