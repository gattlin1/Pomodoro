import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { State } from 'src/models/enums/state.enum';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private title: Title, private datePipe: DatePipe) { }

  public setTitle(state: State, time: number): void {
    const timeLeft = this.datePipe.transform(time, 'mm:ss');
    if (state === State.Working) {
      this.title.setTitle(`Working | ${timeLeft}`);
    } else {
      this.title.setTitle(`Break | ${timeLeft}`)
    }
  }

  public getTitle(): string {
    return this.title.getTitle();
  }
}
