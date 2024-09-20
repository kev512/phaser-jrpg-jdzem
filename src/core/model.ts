import { Worker } from '../models/worker/worker';
import { Event } from '../models/effects/events/event';

let worker: Worker | null = null;
let previousScene: string | null = null;
let currentScene: string | null = null;
let window = {
  visible: false,
  title: '',
  description: '',
};

export class Model {
  constructor() {
    setTimeout(() => {
      window.visible = true;
      window.title = 'Test';
      window.description = 'Hello World';
      console.log('window', window);
    }, 1000);

    setTimeout(() => {
      window.visible = false;
      window.title = '';
      window.description = '';
    }, 10000);
  }

  get worker(): Worker {
    if (!worker) {
      worker = new Worker();
    }

    return worker;
  }

  get window()  {
    return window;
  }

  get previousScene(): string | null {
    return previousScene;
  }

  emit(event: Event) {
    window.visible = true;
    window.title = event.getName();
    window.description = event.getDescription();

    this.worker.applyEffect(event.getEffect());

    setTimeout(() => {
      window.visible = false;
      window.title = '';
      window.description = '';
    }, 1000);
  }

  setScene(key: string) {
    previousScene = currentScene;
    currentScene = key;
  }
}
