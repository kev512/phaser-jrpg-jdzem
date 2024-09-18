import { Worker } from '../models/worker/worker';

let worker: Worker | null = null;
let previousScene: string | null = null;
let currentScene: string | null = null;

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

  setScene(key: string) {
    previousScene = currentScene;
    currentScene = key;
  }
}
