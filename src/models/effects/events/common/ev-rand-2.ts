import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV2'; //random event 2

export class EvRand2 extends Event {
  constructor() {
    super(
      id,
      'Pogadanka',
      'Szef znowu się do ciebie przyczepił\nbo nie wykonujesz pracy\nzgodnie z przepisami',
      new Effect({ //(+stres)
        stress:15
      }),
    );
  }
}