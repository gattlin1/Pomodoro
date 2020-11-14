import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClockSettingsService {
  private _workingTime: number;
  private _sRestTime: number;
  private _lRestTime: number;

  constructor() {
    this._workingTime = this.minToMs(25);
    this._sRestTime = this.minToMs(5);
    this._lRestTime = this.minToMs(15);
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

  public get sRestTime(): number {
    return this._sRestTime;
  }

  public set sRestTime(time: number) {
    this._sRestTime = this.minToMs(time);
  }

  public get lRestTime(): number {
    return this._lRestTime;
  }

  public set lRestTime(time: number) {
    this._lRestTime = this.minToMs(time);
  }}
