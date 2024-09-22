import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'CHAT_WITH_BUDDIES';

export class ChatWithBuddies extends Event {
  constructor() {
    super(
      id,
      'Rozmowa z ziomkami',
      '',
      new Effect({
        stress: -15,
        fatigue: -15,
        reputation: 10,
        minutes: -7
      }),
    );
  }
}
