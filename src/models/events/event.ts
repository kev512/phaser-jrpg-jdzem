import { Effect } from '../effects';

export abstract class Event {
  private effect: Effect;

  getEffect() {
    return this.effect;
  }
}
