export abstract class Restroom {
  protected name: string;
  protected urination: number;
  protected excrement: number;

  getName(): string {
    return this.name;
  }

  getUrinationValue(): number {
    return this.urination;
  }

  getExcrementValue(): number {
    return this.excrement;
  }
}

export class Pissoir extends Restroom {
  constructor() {
    super();

    this.name = 'pissoir';
    this.urination = 100;
    this.excrement = 0;
  }
}

export class Toilet extends Restroom {
  constructor() {
    super();

    this.name = 'toilet';
    this.urination = 100;
    this.excrement = 100;
  }
}
