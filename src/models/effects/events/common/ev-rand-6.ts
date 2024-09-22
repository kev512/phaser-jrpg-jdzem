import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV6'; //random event 6

export class EvRand6 extends Event {
  constructor() {
    super(
      id,
      'Mokra sprawa',
      'Twoi koledzy z magazynu zauważyli,\nże przyszedłeś do pracy w skarptekach w jednorożce,\nktóre dostałeś na święta od mamy.\nPrzez cały czas pracy ogarniał przeszywający wstyd.',
      new Effect({
        // (-reputacja, +stres, +mocz)
        reputation: -15,
        stress: 20,
        urine: 30,
      }),
    );
  }
}
