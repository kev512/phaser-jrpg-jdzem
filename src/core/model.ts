import { AfterShift } from '../models/effects/events/after-shift';
import { AfterWork } from '../models/effects/events/after-work';
import { Test } from '../models/effects/events/common/test';
import { Event } from '../models/effects/events/event';
import { StartGame } from '../models/effects/events/start-game';
import { Worker } from '../models/worker/worker';
import { Timer } from '../models/timer/timer';
import { Window } from './types/window';
import { isNil } from 'lodash';
import { EvRand0 } from '../models/effects/events/common/ev-rand-0';
import { EvRand1 } from '../models/effects/events/common/ev-rand-1';
import { EvRand2 } from '../models/effects/events/common/ev-rand-2';
import { MAX_FATIGUE, MAX_HUNGER, MAX_POOP, MAX_STRESS, MAX_THIRST, MAX_URINE } from '../models/worker/worker.consts';
import { EvRand3 } from '../models/effects/events/common/ev-rand-3';
import { EvRand4 } from '../models/effects/events/common/ev-rand-4';
import { EvRand5 } from '../models/effects/events/common/ev-rand-5';
import { EvRand6 } from '../models/effects/events/common/ev-rand-6';
import { EvRand7 } from '../models/effects/events/common/ev-rand-7';
import { EvRand8 } from '../models/effects/events/common/ev-rand-8';
import { EvRand9 } from '../models/effects/events/common/ev-rand-9';
import { EvRand10 } from '../models/effects/events/common/ev-rand-10';
import { EvRand11 } from '../models/effects/events/common/ev-rand-11';
import { EvRand12 } from '../models/effects/events/common/ev-rand-12';
import { EvRand13 } from '../models/effects/events/common/ev-rand-13';
import { EvRand14 } from '../models/effects/events/common/ev-rand-14';
import { EvRand15 } from '../models/effects/events/common/ev-rand-15';
import { EvRand16 } from '../models/effects/events/common/ev-rand-16';
import { EvRand17 } from '../models/effects/events/common/ev-rand-17';

let worker: Worker | null = null;
let previousScene: string | null = null;
let currentScene: string | null = null;
let window: Window = {
  visible: false,
  title: '',
  description: '',
  options: [],
  callbacks: [],
};
let days: number = 1;
let breakNumber: number = 1;
let lateCounter: number = 0;
let dayScore = 0;
let totalScore = 0;
let bestScore = 0;
let letters: string[] = [];
let interval: any;

const commonEvents: Event[] = [
  new EvRand0(),
  new EvRand1(),
  new EvRand2(),
  new EvRand3(),
  new EvRand4(),
  new EvRand5(),
  new EvRand6(),
  new EvRand7(),
  new EvRand8(),
  new EvRand9(),
  new EvRand10(),
  new EvRand11(),
  new EvRand12(),
  new EvRand13(),
  new EvRand14(),
  new EvRand15(),
  new EvRand16(),
  new EvRand17(),
];
const criticalEvents: Event[] = [];

let typingSpeed = 15;

export class Model {
  constructor() {
    const value = localStorage.getItem('bestScore');

    if (value && !isNaN(+value)) {
      bestScore = +value;
    }
  }

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

  get scores() {
    return {
      total: totalScore,
      day: dayScore,
      best: bestScore,
    };
  }

  get isInSmokeSpot() {
    return currentScene === 'SmokeSpot';
  }

  showWindow(title: string, description: string, options: (Event | null)[] = [], callbacks: (() => void)[] = []) {
    window.visible = true;
    window.title = title;
    window.options = options;
    window.callbacks = callbacks;
    this.descriptionWriter(description);
  }

  hideWindow() {
    window.visible = false;
    window.title = '';
    window.description = '';
    window.options = [];
    window.callbacks = [];
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

  runWindowCallback(index: number) {
    const callback = window.callbacks[index];

    if (!isNil(callback)) {
      callback();
    }
  }

  startGame() {
    worker = null;
    previousScene = null;
    currentScene = null;
    window = {
      visible: false,
      title: '',
      description: '',
      options: [],
      callbacks: [],
    };
    days = 1;
    breakNumber = 1;
    lateCounter = 0;
    dayScore = 0;
    totalScore = 0;

    this.emit(new StartGame());
  }

  finishBreak(goToAfternoonScene: () => void, goToGameOverScene: () => void) {
    if (this.worker.getTimer().isTimeUp()) {
      lateCounter++;
    }

    if (lateCounter >= 3 || this.worker.getTimer().isTimeUpExceedingCriticalLevel()) {
      goToGameOverScene();

      return;
    }

    if (breakNumber === 1) {
      dayScore = 0;
    }

    dayScore +=
      1000 * this.days +
      (MAX_HUNGER - this.worker.getHunger()) +
      (MAX_THIRST - this.worker.getThirst()) +
      (MAX_URINE - this.worker.getUrine()) +
      (MAX_POOP - this.worker.getPoop()) +
      (MAX_STRESS - this.worker.getStress()) +
      (MAX_FATIGUE - this.worker.getFatigue());

    if (this.breakNumber === 3) {
      totalScore += dayScore;

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

    this.worker.getTimer().reset();

    if (totalScore > bestScore) {
      bestScore = totalScore;

      localStorage.setItem('bestScore', `${bestScore}`);
    }
  }

  emit(event: Event) {
    let isError: boolean = false;

    try {
      this.worker.applyEffect(event.getEffect());
    } catch (error: unknown) {
      isError = true;
    }

    if (isError) {
      window.visible = true;
      window.title = 'Kurza twarz';
      window.options = [];
      this.descriptionWriter('Nie możesz tego zrobić!' + '\n\n1. OK [ESC]');
    } else {
      window.visible = true;
      window.title = event.getName();
      window.options = [];
      this.descriptionWriter(event.getDescription() + '\n\n1. OK [ESC]');
    }
  }

  setScene(key: string) {
    previousScene = currentScene;
    currentScene = key;
  }

  descriptionWriter(text: string) {
    window.description = '';
    letters = text.split('');

    if (!interval) {
      interval = setInterval(() => {
        if (letters.length > 0) {
          window.description += letters[0];
          letters.shift();
        }
      }, typingSpeed);
    }
  }
}
