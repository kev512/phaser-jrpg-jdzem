import { isUndefined } from 'lodash';
import { Effect } from '../effects/effects';
import { Item } from '../effects/items/item';
import { Resources } from '../resources/resources';
import {
  INITIAL_SPEED,
  INITIAL_TIMER_MINUTES,
  MAX_DRUNKNESS,
  MAX_FATIGUE,
  MAX_HUNGER,
  MAX_POOP,
  MAX_SPEED,
  MAX_STRESS,
  MAX_THIRST,
  MAX_URINE,
} from './worker.consts';
import { Timer } from '../timer/timer';

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
  private items: Item[] = [];

  private timer: Timer;

  constructor() {}

  getTimer(): Timer {
    if (isUndefined(this.timer)) {
      this.timer = new Timer(INITIAL_TIMER_MINUTES);
    }

    return this.timer;
  }

  applyEffect(effect: Effect) {
    this.resources.applyEffect(effect);

    this.hunger = Math.min(MAX_HUNGER, Math.max(0, this.hunger + effect.getEffectHunger()));
    this.thirst = Math.min(MAX_THIRST, Math.max(0, this.thirst + effect.getEffectThirst()));
    this.urine = Math.min(MAX_URINE, Math.max(0, this.urine + effect.getEffectUrine()));
    this.poop = Math.min(MAX_POOP, Math.max(0, this.poop + effect.getEffectPoop()));
    this.stress = Math.min(MAX_STRESS, Math.max(0, this.stress + effect.getEffectStress()));
    this.fatigue = Math.min(MAX_FATIGUE, Math.max(0, this.fatigue + effect.getEffectFatigue()));
    this.speed = Math.min(MAX_SPEED, Math.max(0, this.speed + effect.getEffectSpeed()));
    this.drunkness = Math.min(MAX_DRUNKNESS, Math.max(0, this.drunkness + effect.getDrunkness()));

    this.getTimer().adjustTime(effect.getMinutes() * 60);
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  removeItem(item: Item) {
    const index = this.items.findIndex((i) => i.getId() === item.getId());
    this.items = this.items.filter((_, i) => i !== index);
  }

  hasItem(id: string) {
    return !isUndefined(this.items.find((item) => item.getId() === id));
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
    return this.drunkness;
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

  getBeers(): number {
    return this.resources.getBeers();
  }

  isCriticalState(): boolean {
    return (
      this.hunger === MAX_HUNGER ||
      this.thirst === MAX_THIRST ||
      this.urine === MAX_URINE ||
      this.poop === MAX_POOP ||
      this.fatigue === MAX_FATIGUE ||
      this.stress === MAX_STRESS
    );
  }

  decreaseCash(amount: number) {
    this.resources.decreaseCash(amount);
  }

  addDiaper() {
    this.resources.applyEffect(new Effect({ diapers: 1 }));
  }

  addBeer() {
    this.resources.applyEffect(new Effect({ beers: 1 }));
  }

  addSmokes() {
    this.resources.applyEffect(new Effect({ smokes: 1 }));
  }
}
