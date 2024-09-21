import { Effect } from '../effects/effects';
import { INITIAL_CASH, MAX_REPUTATION } from './resources.consts';

export class Resources {
  private cash: number = INITIAL_CASH;
  private reputation: number = 0;
  private diapers: number = 0;
  private beers: number = 0;
  private smokes: number = 0;

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

  applyEffect(effect: Effect) {
    this.cash += effect.getCash();
    this.reputation = Math.max(0, Math.min(MAX_REPUTATION, this.reputation + effect.getReputation()));
    this.diapers += effect.getDiapers();
    this.beers += effect.getBeers();
    this.smokes += effect.getSmokes();
  }
}
