export class Timer {
  private remainingTime: number; // in seconds
  private isPaused: boolean;

  constructor(minutes: number) {
    this.remainingTime = minutes * 60;
    this.isPaused = false;
  }

  start() {
    this.isPaused = false;
  }

  update(deltaTime: number) {
    deltaTime = Math.min(deltaTime, 15);
    if (!this.isPaused && this.remainingTime > 0) {
      this.remainingTime -= deltaTime / 1000;
    }
  }

  adjustTime(seconds: number) {
    this.remainingTime += seconds;
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = Math.floor(this.remainingTime % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  isTimeUp(): boolean {
    return this.remainingTime <= 0;
  }
}