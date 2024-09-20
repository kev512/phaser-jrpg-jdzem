import { Effect } from '../effects/effects';
import { Resources } from '../resources/resources';
import {
  INITIAL_SPEED,
  MAX_DRUNKNESS,
  MAX_FATIGUE,
  MAX_HUNGER,
  MAX_POOP,
  MAX_SPEED,
  MAX_STRESS,
  MAX_THIRST,
  MAX_URINE,
} from './worker.consts';

export class Worker {
  private hunger: number = 0;
  private thirst: number = 0;
  private urine: number = 0;
  private poop: number = 0;
  private stress: number = 0;
  private fatigue: number = 0;
  private speed: number = INITIAL_SPEED;
  private drunkness: number = 0;

  private resources: Resources = new Resources();

  constructor() {}

  applyEffect(effect: Effect) {
    this.hunger = Math.min(
      MAX_HUNGER,
      Math.max(0, this.hunger + effect.getEffectHunger()),
    );
    this.thirst = Math.min(
      MAX_THIRST,
      Math.max(0, this.thirst + effect.getEffectThirst()),
    );
    this.urine = Math.min(
      MAX_URINE,
      Math.max(0, this.urine + effect.getEffectUrine()),
    );
    this.poop = Math.min(
      MAX_POOP,
      Math.max(0, this.poop + effect.getEffectPoop()),
    );
    this.stress = Math.min(
      MAX_STRESS,
      Math.max(0, this.stress + effect.getEffectStress()),
    );
    this.fatigue = Math.min(
      MAX_FATIGUE,
      Math.max(0, this.fatigue + effect.getEffectFatigue()),
    );
    this.speed = Math.min(
      MAX_SPEED,
      Math.max(0, this.speed + effect.getEffectSpeed()),
    );
    this.drunkness = Math.min(
      MAX_DRUNKNESS,
      Math.max(0, this.drunkness + effect.getDrunkness()),
    );

    this.resources.applyEffect(effect);
  }

  getHunger(): number {
    return this.hunger;
  }

  getThirst(): number {
    return this.thirst;
  }

  getUrine(): number {
    return this.urine;
  }

  getPoop(): number {
    return this.poop;
  }

  getStress(): number {
    return this.stress;
  }

  getFatigue(): number {
    return this.fatigue;
  }

  getSpeed(): number {
    return this.speed;
  }

  getDrunkness(): number {
    return this.fatigue;
  }

  getCash(): number {
    return this.resources.getCash();
  }

  getDiapers(): number {
    return this.resources.getDiapers();
  }

  getSmokes(): number {
    return this.resources.getSmokes();
  }
}
