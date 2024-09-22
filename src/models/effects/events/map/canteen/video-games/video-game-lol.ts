import { Effect } from '../../../../effects';
import { Event } from '../../../event';

export const id = 'VIDEO_GAME_LOL';

export class VideoGameLol extends Event {
  constructor() {
    super(
      id,
      'Gierka',
      'Jak zwykle dobrało Ci samych nubów\n do teamu. Zamisat relasku dopadła Cię\n jeszcze większa depresja i wstręt...\n do siebie.',
      new Effect({
        stress: +100,
      }),
    );
  }
}
