import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'BUFFET_LUNCH';

export class BuffetLunch extends Event {
  constructor() {
    super(
      id,
      'Danie dnia',
      'Średnie ale przynajmniej drogo...\n.. Czekaj co?',
      new Effect({
        hunger: -40,
        thirst: -40,
        poop: 15,
        urine: 15,
        minutes: -10,
        cash: -15
      }),
    );
  }
}
