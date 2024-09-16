import { Effect } from '../effects';

export abstract class Event {
  constructor(
    private id: string,
    private name: string,
    private description: string,
    private effect: Effect,
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

  getEffect() {
    return this.effect;
  }
}
