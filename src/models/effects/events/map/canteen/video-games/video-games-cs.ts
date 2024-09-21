import { Effect } from '../../../../effects';
import { Event } from '../../../event';

export const id = 'VIDEO_GAME_SC';

export class VideoGameCS extends Event {
  constructor() {
    super(
      id,
      'Gierka',
      'Nic nie relaksuje tak\njak rundka w CSa.',
      new Effect({
        stress: -20,
      }),
    );
  }
}