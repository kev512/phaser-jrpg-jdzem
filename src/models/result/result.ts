export class Result {
  private totalCash: number = 0;
  private totalWorkingDays: number = 0;

  constructor() {}

  addTotalCash(wage: number) {
    this.totalCash += wage;
  }

  increaseTotalWorkingDays() {
    this.totalWorkingDays++;
  }

  // TODO Getters
}
