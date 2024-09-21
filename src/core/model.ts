import { Worker } from '../models/worker/worker';
import { Event } from '../models/effects/events/event';
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

let i = 0;
let typingSpeed = 50;

export class Model {
  constructor() {
    setTimeout(() => {
      window.visible = true;
      window.title = 'Test';
      this.descriptionWriter('Hello World');
    }, 1500);
  }

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
      timerObject = new Timer(0.1);
    }

    return timerObject;
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
