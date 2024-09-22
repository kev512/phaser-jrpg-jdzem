import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV17'; //random event 17

export class EvRand17 extends Event {
  constructor() {
    super(
      id,
      'Pomysłowy dobromir',
      'Twoje podejście do "oszczędzania energii" polegało na zwolnieniu tempa – niestety, majster cię przyuważył i nie docenił inowacyjnego pomysłu.',
      new Effect({
        //(+stres  -rep  - zmęczenie )
        stress: 15,
        reputation: -20,
        fatigue: -20,
      }),
    );
  }
}
