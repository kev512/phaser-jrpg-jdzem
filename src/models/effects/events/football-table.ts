import { Effect } from '../effects';
import { Event } from './event';

export const id = 'FOOTBALL_TABLE';

export class FootballTable extends Event {
  constructor() {
    super(
      id,
      'Piłkarzyki',
      '',
      new Effect({
        stress: -20,
      }),
    );
  }
}
