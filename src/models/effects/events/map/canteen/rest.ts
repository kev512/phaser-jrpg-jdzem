import { Effect } from '../../../effects';
import { Event } from '../../event';

export const id = 'REST';

export class Rest extends Event {
  constructor() {
    super(
      id,
      'Odpoczynek',
      'Chwilę poleżałeś na kanapie.',
      new Effect({
        fatigue: -50,
        stress: -30,
        minutes: -10,
      }),
    );
  }
}
