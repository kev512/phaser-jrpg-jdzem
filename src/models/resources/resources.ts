import { Effect } from '../effects/effects';
import { INITIAL_CASH, MAX_REPUTATION } from './resources.consts';

export class Resources {
  private cash: number = INITIAL_CASH;
  private reputation: number = 0;
  private diapers: number = 1;
  private beers: number = 1;
  private smokes: number = 1;

  getCash(): number {
    return this.cash;
  }

  decreaseCash(amount: number) {
    this.cash -= amount;
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
    if (this.cash + effect.getCash() < 0) {
      throw new Error('Not enough cash');
    }

    if (this.diapers + effect.getDiapers() < 0) {
      throw new Error('Not enough diapers');
    }

    if (this.beers + effect.getBeers() < 0) {
      throw new Error('Not enough beers');
    }

    if (this.smokes + effect.getSmokes() < 0) {
      throw new Error('Not enough smokes');
    }

    this.cash += effect.getCash();
    this.diapers += effect.getDiapers();
    this.beers += effect.getBeers();
    this.smokes += effect.getSmokes();

    this.reputation = Math.max(0, Math.min(MAX_REPUTATION, this.reputation + effect.getReputation()));
  }
}
