import { Food } from './food';
import { Resources } from './resources';
import { Restroom } from './restroom';

export class Worker {
  private hunger: number = 0;
  private thirst: number = 0;
  private urine: number = 0;
  private poop: number = 0;
  private stress: number = 0;
  private fatigue: number = 0;

  private resources: Resources;

  constructor() {}

  consume(food: Food) {
    this.hunger = Math.max(0, this.hunger - food.getNutrition());
    this.thirst = Math.max(0, this.thirst - food.getHydration());
  }

  // TODO Obsłużyć przypadek kiedy nie ma pieniędzy

  buyFood(food: Food) {
    this.resources.subtractCash(food.getPrice());
  }

  // TODO buyItem

  relieve(restroom: Restroom) {
    this.urine = Math.max(0, this.urine - restroom.getUrinationValue());
    this.poop = Math.max(0, this.poop - restroom.getExcrementValue());
  }

  increaseHunger(value: number) {
    if (value < 0) {
      throw Error('Negative hunger value');
    }

    this.hunger += value;
  }

  increaseThirst(value: number) {
    if (value < 0) {
      throw Error('Negative thirst value');
    }

    this.thirst += value;
  }

  increaseUrine(value: number) {
    if (value < 0) {
      throw Error('Negative urine value');
    }

    this.urine += value;
  }

  decreaseUrine(value: number) {
    if (value < 0) {
      throw Error('Negative urine value');
    }

    this.urine -= value;
  }

  increasePoop(value: number) {
    if (value < 0) {
      throw Error('Negative poop value');
    }

    this.poop += value;
  }

  decreasePoop(value: number) {
    if (value < 0) {
      throw Error('Negative poop value');
    }

    this.poop -= value;
  }

  increaseStress(value: number) {
    if (value < 0) {
      throw Error('Negative stress value');
    }

    this.stress += value;
  }

  decreaseStress(value: number) {
    if (value < 0) {
      throw Error('Negative stress value');
    }

    this.stress -= value;
  }

  increaseFatigue(value: number) {
    if (value < 0) {
      throw Error('Negative fatigue value');
    }

    this.fatigue += value;
  }

  decreaseFatigue(value: number) {
    if (value < 0) {
      throw Error('Negative fatigue value');
    }

    this.fatigue -= value;
  }
}
