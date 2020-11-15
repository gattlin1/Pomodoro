import { Component } from '@angular/core';
import { ClockSettingsService } from 'src/app/services/clock-settings/clock-settings.service';
import { TitleService } from 'src/app/services/title/title.service';
import { State } from 'src/models/enums/state.enum';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent {
  public timeLeft: number;
  public state: State;
  private handle: any;

  constructor(private clockService: ClockSettingsService, private titleService: TitleService) {
    this.state = State.Working;
    this.timeLeft = this.clockService.getTime(this.state);
    this.titleService.setTitle(this.state, this.timeLeft);
  }

  public onSwitchState(state: string): void {
    const stateEnum: State = State[state];
    if (this.state !== stateEnum) {
      this.state = stateEnum;
      this.clearTimer();
      this.timeLeft = this.clockService.getTime(this.state);
      this.titleService.setTitle(this.state, this.timeLeft);
    }
  }

  public onStart(): void {
    const aSecond = 1000;
    this.handle = setInterval(() => {
      this.timeLeft -= aSecond;
      this.titleService.setTitle(this.state, this.timeLeft);
    }, aSecond);
  }

  public onStop(): void {
    this.clearTimer();
  }

  private clearTimer(): void {
    clearInterval(this.handle);
  }
}
