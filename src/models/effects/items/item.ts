import { Effect } from '../effects';

export abstract class Item {
  constructor(
    private id: string,
    private name: string,
    private description: string,
    private effect: Effect,
    private price: number,
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getPrice() {
    return this.price;
  }

  getEffect() {
    return this.effect;
  }
}
