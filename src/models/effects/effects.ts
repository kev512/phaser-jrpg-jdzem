export class Effect {
  private hunger: number;
  private thirst: number;
  private urine: number;
  private poop: number;
  private stress: number;
  private fatigue: number;
  private cash: number;
  private reputation: number;
  private speed: number;
  private diapers: number;
  private beers: number;
  private smokes: number;
  // pass in consumables attributes

  constructor(input: {
    hunger?: number;
    thirst?: number;
    urine?: number;
    poop?: number;
    stress?: number;
    fatigue?: number;
  }) {
    this.hunger = input.hunger || 0;
    this.thirst = input.thirst || 0;
    this.urine = input.urine || 0;
    this.poop = input.poop || 0;
    this.stress = input.stress || 0;
    this.fatigue = input.fatigue || 0;
  }

  getEffectHunger(): number {
    return this.hunger;
  }

  getEffectThirst(): number {
    return this.thirst;
  }

  getEffectUrine(): number {
    return this.urine;
  }

  getEffectPoop(): number {
    return this.poop;
  }

  getEffectStress(): number {
    return this.stress;
  }

  getEffectFatigue(): number {
    return this.fatigue;
  }

  getEffectSpeed(): number {
    return this.speed;
  }

  getCash(): number {
    return this.cash;
  }

  getReputation(): number {
    return this.reputation;
  }

  getDiapers(): number {
    return this.diapers;
  }

  getBeers(): number {
    return this.beers;
  }

  getSmokes(): number {
    return this.smokes;
  }

  resetEffect() {
    this.hunger = 0;
    this.thirst = 0;
    this.urine = 0;
    this.poop = 0;
    this.stress = 0;
    this.fatigue = 0;
    this.speed = 0;
  }
}
