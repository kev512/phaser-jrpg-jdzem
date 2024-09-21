import { AfterShift } from '../models/effects/events/after-shift';
import { AfterWork } from '../models/effects/events/after-work';
import { Test } from '../models/effects/events/common/test';
import { Event } from '../models/effects/events/event';
import { StartGame } from '../models/effects/events/start-game';
import { Worker } from '../models/worker/worker';
import { INITIAL_TIMER_MINUTES } from './consts';
import { Timer } from './scenes/Timer';
import { Window } from './types/window';

let worker: Worker | null = null;
let previousScene: string | null = null;
let currentScene: string | null = null;
let timerObject: Timer | null = null;
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

export class Model {
  constructor() {}

  get worker(): Worker {
    if (!worker) {
      worker = new Worker();
    }

    return worker;
  }

  get window() {
    return window;
  }

  get previousScene(): string | null {
    return previousScene;
  }

  get timerObject(): Timer {
    if (!timerObject) {
      timerObject = new Timer(INITIAL_TIMER_MINUTES);
    }

    return timerObject;
  }

  get days() {
    return days;
  }

  get breakNumber() {
    return breakNumber;
  }

  startGame() {
    this.emit(new StartGame());
  }

  finishBreak(goToAfternoonScene: () => void) {
    if (this.breakNumber === 3) {
      days++;
      breakNumber = 1;
      this.emit(new AfterWork());
      goToAfternoonScene();
    } else {
      breakNumber++;
      this.worker.applyEffect(new AfterShift().getEffect());
      const randomCommonEvent = commonEvents[Math.floor(Math.random() * commonEvents.length)];

      this.emit(randomCommonEvent);
    }

    this.timerObject.reset();
  }

  emit(event: Event) {
    window.visible = true;
    window.title = event.getName();
    window.description = event.getDescription() + '\n\n1. OK [ESC]';
    window.options = [];

    this.worker.applyEffect(event.getEffect());
  }

  setScene(key: string) {
    previousScene = currentScene;
    currentScene = key;
  }
}
