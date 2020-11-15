import { Injectable } from '@angular/core';
import { NumberFormat } from 'src/models/enums/number-format.enum';
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

  public getTimeSettings(format: NumberFormat = NumberFormat.Milliseconds): object {
    const times = {};
    if (format === NumberFormat.Minutes) {
      times[State.Working] = this.msToMin(this.timeSettings[State.Working]);
      times[State.ShortBreak] = this.msToMin(this.timeSettings[State.ShortBreak]);
      times[State.LongBreak] = this.msToMin(this.timeSettings[State.LongBreak]);
      return times;
    } else {
      times[State.Working] = this.timeSettings[State.Working];
      times[State.ShortBreak] = this.timeSettings[State.ShortBreak];
      times[State.LongBreak] = this.timeSettings[State.LongBreak];
      return times;
    }
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

  public msToMin(ms: number): number {
    const seconds = ms / 1000;
    const minutes = seconds / 60;
    return minutes;
  }

}
