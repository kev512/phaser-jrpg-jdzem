import { Effect } from './effects';
import { Resources } from './resources';

export class Worker {
  private hunger: number = 0;
  private thirst: number = 0;
  private urine: number = 0;
  private poop: number = 0;
  private stress: number = 0;
  private fatigue: number = 0;

  private resources: Resources;

  constructor() {}

  applyEffect(effect: Effect) {
    this.hunger = Math.max(0, this.hunger - effect.getEffectHuger());
    this.thirst = Math.max(0, this.thirst - effect.getEffectThirst());
    this.urine = Math.max(0, this.urine - effect.getEffectUrine());
    this.poop = Math.max(0, this.poop - effect.getEffectPoop());
    this.stress = Math.max(0, this.stress - effect.getEffectStress());
    this.fatigue = Math.max(0, this.fatigue - effect.getEffectFatigue());
    this.fatigue = Math.max(0, this.fatigue - effect.getEffectFatigue());
  }
}
