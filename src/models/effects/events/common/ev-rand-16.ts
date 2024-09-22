import { Effect } from '../../effects';
import { Event } from '../event';

export const id = 'REV16'; //random event 16

export class EvRand16 extends Event {
  constructor() {
    super(
      id,
      'Jogurt Fantasia',
      'Szef zawracał wam gitarę swoimi opowieściami\no swojej przebojowej randce dnia poprzeniego.\nJedyne co z tego zapamiętałeś\nto część o zamawianym kebsie i modżajto',
      new Effect({
        //(+głód, +pragnienie)
        hunger: 15,
        thirst: 20,
      }),
    );
  }
}
