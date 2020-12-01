import { setIfDefiend } from "./utils";

interface ConstructorInterface {
  id?: string;
  startTime?: number;
  endTime?: number;
  notes?: string;
  name?: string;
}

export class Pomodoro {
  id: string;
  startTime: number = Date.now();
  endTime?: number;
  notes?: string;
  name?: string;
  size?: string

  constructor({
    startTime,
    id,
    endTime = null,
    notes = null,
    name = null,
  }: ConstructorInterface) {
    // TODO: add invariant
    this.id = id;

    setIfDefiend<Pomodoro>(this, {
      startTime,
      endTime,
      notes,
      name,
    });
  }

  toString() {
    return JSON.stringify(this);
  }

  static of (config: ConstructorInterface) {
    return new Pomodoro(config);
  }
}
