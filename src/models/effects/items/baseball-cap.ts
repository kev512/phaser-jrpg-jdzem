import { Effect } from '../effects';
import { HeadItem } from './head-item';

export const id = 'BASEBALL_CAP';

export class BaseballCap extends HeadItem {
  constructor() {
    super(id, 'Czapka z daszkiem', '', new Effect({ stress: -5 }), 10);
  }
}
