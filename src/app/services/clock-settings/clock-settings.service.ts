import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClockSettingsService {
  private _workingTime: number;
  private _sBreakTime: number;
  private _lBreakTime: number;

  constructor() {
    this._workingTime = this.minToMs(25);
    this._sBreakTime = this.minToMs(5);
    this._lBreakTime = this.minToMs(15);
  }

  public minToMs(minutes: number): number {
    const seconds = minutes * 60;
    const ms = seconds * 1000;
    return ms;
  }

  public get workingTime(): number {
    return this._workingTime;
  }

  public set workingTime(time: number) {
    this._workingTime = this.minToMs(time);
  }

  public get sBreakTime(): number {
    return this._sBreakTime;
  }

  public set sBreakTime(time: number) {
    this._sBreakTime = this.minToMs(time);
  }

  public get lBreakTime(): number {
    return this._lBreakTime;
  }

  public set lBreakTime(time: number) {
    this._lBreakTime = this.minToMs(time);
  }}
