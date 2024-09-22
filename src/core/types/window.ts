import { Event } from '../../models/effects/events/event';

export type Window = {
  visible: boolean;
  title: string;
  description: string;
  options: (Event | null)[];
  callbacks: (() => void)[];
};
