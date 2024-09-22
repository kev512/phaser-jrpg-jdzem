import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV2'; //random event 2

export class EvRand2 extends Event {
  constructor() {
    super(
      id,
      'Randomowy event 2',
      'Szef znowu się do ciebie przyczepił bo nie wykonujesz pracy zgodnie z przepisami',
      new Effect({ //(+stres)
        stress:15
      }),
    );
  }
}