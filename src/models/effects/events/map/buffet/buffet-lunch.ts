import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'BUFFET_LUNCH';

export class BuffetLunch extends Event {
  constructor() {
    super(
      id,
      'Danie dnia',
      'Średnie, za to jak drogo...\n.. Czekaj co?',
      new Effect({
        hunger: -50,
        thirst: -50,
        fatigue: -20,
        poop: 15,
        urine: 15,
        minutes: -9,
        cash: -50,
      }),
    );
  }
}
