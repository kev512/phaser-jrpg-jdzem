import { Effect } from '../../../../effects';
import { Event } from '../../../event';

export const id = 'VIDEO_GAME_TEKKEN';

export class VideoGameTekken extends Event {
  constructor() {
    super(
      id,
      'Gierka',
      'Po losowym uderzaniu w klawisze\ndostrzegłeś, że przeciwnik\nnie ma z tobą szans.\nGrałeś w trybie samouczka.',
      new Effect({
        hunger: +5,
        stress: -10,
      }),
    );
  }
}