import { Injectable } from '@angular/core';
import { State } from 'src/models/enums/state.enum';

@Injectable({
  providedIn: 'root'
})
export class ClockSettingsService {
  private timeSettings: object;

  constructor() {
    this.timeSettings = {
      [State.Working]: this.minToMs(25),
      [State.ShortBreak]: this.minToMs(5),
      [State.LongBreak]: this.minToMs(15)
    };
  }


  public getTime(state: State): number {
    return this.timeSettings[state];
  }

  public setTime(state: State, newMins: number): void {
    this.timeSettings[state] = this.minToMs(newMins);
  }

  public minToMs(minutes: number): number {
    const seconds = minutes * 60;
    const ms = seconds * 1000;
    return ms;
  }

}
