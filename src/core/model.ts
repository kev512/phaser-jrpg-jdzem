import { AfterShift } from '../models/effects/events/after-shift';
import { AfterWork } from '../models/effects/events/after-work';
import { Test } from '../models/effects/events/common/test';
import { Event } from '../models/effects/events/event';
import { StartGame } from '../models/effects/events/start-game';
import { Worker } from '../models/worker/worker';
import { Timer } from '../models/timer/timer';
import { Window } from './types/window';

let worker: Worker | null = null;
let previousScene: string | null = null;
let currentScene: string | null = null;
let window: Window = {
  visible: false,
  title: '',
  description: '',
  options: [],
};
let days: number = 1;
let breakNumber: number = 1;

const commonEvents: Event[] = [new Test()];
const criticalEvents: Event[] = [];

let i = 0;
let typingSpeed = 50;

export class Model {
  constructor() {}

  get worker(): Worker {
    if (!worker) {
      worker = new Worker();
    }

    return worker;
  }

  get previousScene(): string | null {
    return previousScene;
  }

  get isWindowVisible(): boolean {
    return window.visible;
  }

  get timerObject(): Timer {
    return this.worker.getTimer();
  }

  get days() {
    return days;
  }

  get breakNumber() {
    return breakNumber;
  }

  showWindow(title: string, description: string, options: (Event | null)[] = []) {
    window.visible = true;
    window.title = title;
    window.options = options;
    this.descriptionWriter(description);
  }

  hideWindow() {
    window.visible = false;
    window.title = '';
    window.description = '';
    window.options = [];
  }

  getWindowOption(index: number): Event | null {
    return index <= window.options.length - 1 ? window.options[index] : null;
  }

  getWindowTitle(): string {
    return window.title;
  }

  getWindowDescription(): string {
    return window.description;
  }

  startGame() {
    this.emit(new StartGame());
  }

  finishBreak(goToAfternoonScene: () => void) {
    if (this.breakNumber === 3) {
      days++;
      breakNumber = 1;

      const afterWork = new AfterWork();
      this.worker.applyEffect(afterWork.getEffect());

      const afterShift = new AfterShift();
      this.worker.applyEffect(afterShift.getEffect());

      goToAfternoonScene();
    } else {
      breakNumber++;

      const afterShift = new AfterShift();
      this.worker.applyEffect(afterShift.getEffect());

      const randomCommonEvent = commonEvents[Math.floor(Math.random() * commonEvents.length)];

      this.emit(randomCommonEvent);
    }

    console.log('Days: ', days, 'Break: ', breakNumber);
  }

  emit(event: Event) {
    window.visible = true;
    window.title = event.getName();
    window.options = [];
    this.descriptionWriter(event.getDescription() + '\n\n1. OK [ESC]');

    this.worker.applyEffect(event.getEffect());
  }

  setScene(key: string) {
    previousScene = currentScene;
    currentScene = key;
  }

  descriptionWriter(text: string) {
    i = 0;
    window.description = '';

    function type() {
      if (i < text.length) {
        window.description += text.charAt(i);
        i++;
        setTimeout(type, typingSpeed);
      }
    }

    type();
  }
}
