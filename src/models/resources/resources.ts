import { INITIAL_CASH } from './resources.consts';

export class Resources {
  private cash: number = INITIAL_CASH;
  private reputation: number = 0;

  getCash(): number {
    return this.cash;
  }

  getReputation(): number {
    return this.reputation;
  }

  addCash(paycheck: number) {
    if (paycheck < 0) {
      throw Error('Negative paycheck');
    }

    this.cash += paycheck;
  }

  subtractCash(price: number) {
    if (price < 0) {
      throw Error('Negative price');
    }

    this.cash -= price;
  }
}
