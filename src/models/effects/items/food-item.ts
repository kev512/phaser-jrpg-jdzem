import { Effect } from '../effects';
import { Item } from './item';
import { Event } from '../events/event';

export abstract class FoodItem extends Item {
  constructor(id: string, name: string, description: string, effect: Effect, price: number) {
    super(id, name, description, effect, price);
  }

  getEatEvent(): Event {
    return new Eat(this.getName(), this.getDescription(), this.getEffect());
  }
}

class Eat extends Event {
  constructor(name: string, description: string, effect: Effect) {
    super('EAT', name, description, effect);
  }
}
