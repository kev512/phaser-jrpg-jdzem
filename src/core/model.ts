import { AfterShift } from '../models/effects/events/after-shift';
import { AfterWork } from '../models/effects/events/after-work';
import { Test } from '../models/effects/events/common/test';
import { Event } from '../models/effects/events/event';
import { StartGame } from '../models/effects/events/start-game';
import { Worker } from '../models/worker/worker';
import { Timer } from '../models/timer/timer';
import { Window } from './types/window';
import { isNil } from 'lodash';
import { MAX_FATIGUE, MAX_HUNGER, MAX_POOP, MAX_STRESS, MAX_THIRST, MAX_URINE } from '../models/worker/worker.consts';

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

const commonEvents: Event[] = [new Test()];
const criticalEvents: Event[] = [];

let i = 0;
let typingSpeed = 10;

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
