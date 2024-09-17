import { Worker } from '../models/worker/worker';

let worker: Worker | null;

export class Model {
  constructor() {}

  get worker(): Worker {
    if (!worker) {
      worker = new Worker();
    }

    return worker;
  }
}
