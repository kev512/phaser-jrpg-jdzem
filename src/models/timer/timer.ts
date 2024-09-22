import { CRITICAL_TIME_UP_MINUTES } from './timer.consts';

export class Timer {
  private remainingTime: number;
  private delayTime: number = 0;
  private isPaused: boolean;
  private initialTime: number;

  constructor(initialTime: number) {
    this.initialTime = initialTime * 60;
    this.remainingTime = initialTime * 60;
    this.isPaused = false;
  }

  start() {
    this.isPaused = false;
  }

  update(deltaTime: number) {
    deltaTime = Math.min(deltaTime, 15);
    if (!this.isPaused && this.remainingTime > 0) {
      this.remainingTime -= deltaTime / 1000;
    } else if (this.remainingTime <= 0) {
      this.delayTime += deltaTime / 1000;
    }
  }

  adjustTime(seconds: number) {
    this.remainingTime += seconds;
  }

  getFormattedTime(): string {
    const remaining = Math.max(this.remainingTime, 0);
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  getDelayFormattedTime(): string {
    const minutes = Math.floor(this.delayTime / 60);
    const seconds = Math.floor(this.delayTime % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  isTimeUp(): boolean {
    return this.remainingTime <= 0;
  }

  isTimeUpExceedingCriticalLevel(): boolean {
    return this.remainingTime <= CRITICAL_TIME_UP_MINUTES;
  }

  reset() {
    this.remainingTime = this.initialTime;
  }
}
