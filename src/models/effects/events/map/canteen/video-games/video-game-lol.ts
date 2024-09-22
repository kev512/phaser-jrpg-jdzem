import { Effect } from '../../../../effects';
import { Event } from '../../../event';

export const id = 'VIDEO_GAME_LOL';

export class VideoGameLol extends Event {
  constructor() {
    super(
      id,
      'Gierka',
      'Jak zwykle dobrało Ci samych nubów\ndo teamu. Zamisat relasku dopadła Cię\njeszcze większa depresja i wstręt...\ndo siebie. Standardowo ff15.',
      new Effect({
        stress: +100,
        minutes: -15,
      }),
    );
  }
}
