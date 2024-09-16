import { EffectInput } from './effect-input';

export class Effect {
  constructor(private input: EffectInput) {}

  getEffectHunger(): number {
    return this.input?.hunger || 0;
  }

  getEffectThirst(): number {
    return this.input?.thirst || 0;
  }

  getEffectUrine(): number {
    return this.input?.urine || 0;
  }

  getEffectPoop(): number {
    return this.input?.poop || 0;
  }

  getEffectStress(): number {
    return this.input?.stress || 0;
  }

  getEffectFatigue(): number {
    return this.input?.fatigue || 0;
  }

  getEffectSpeed(): number {
    return this.input?.speed || 0;
  }

  getCash(): number {
    return this.input?.cash || 0;
  }

  getReputation(): number {
    return this.input?.reputation || 0;
  }

  getDiapers(): number {
    return this.input?.diapers || 0;
  }

  getBeers(): number {
    return this.input?.beers || 0;
  }

  getSmokes(): number {
    return this.input?.smokes || 0;
  }
}
