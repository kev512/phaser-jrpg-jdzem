export abstract class Food {
  protected name: string;
  protected price: number;
  protected nutrition: number;
  protected hydration: number;

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getNutrition(): number {
    return this.nutrition;
  }

  getHydration(): number {
    return this.hydration;
  }
}

export class Snack extends Food {
  constructor() {
    super();

    this.name = 'snack';
    this.price = 100;
    this.nutrition = 20;
    this.hydration = 0;
  }
}

export class Drink extends Food {
  constructor() {
    super();

    this.name = 'drink';
    this.price = 100;
    this.nutrition = 0;
    this.hydration = 20;
  }
}

export class Lunch extends Food {
  constructor() {
    super();

    this.name = 'lunch';
    this.price = 300;
    this.nutrition = 20;
    this.hydration = 15;
  }
}

export class BuffetLunch extends Food {
  constructor() {
    super();

    this.name = 'buffet-lunch';
    this.price = 400;
    this.nutrition = 20;
    this.hydration = 10;
  }
}
