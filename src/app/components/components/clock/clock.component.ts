import { Component } from '@angular/core';
import { ClockSettingsService } from 'src/app/services/clock-settings/clock-settings.service';
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

  constructor(private clockService: ClockSettingsService) {
    this.state = State.Working;
    this.timeLeft = this.clockService.workingTime;
  }

  public onSwitchToWorking(): void {
    if (this.state !== State.Working) {
      this.state = State.Working;
      this.timeLeft = this.clockService.workingTime;
    }
  }

  public onSwitchToSBreak(): void {
    if (this.state !== State.ShortBreak) {
      this.state = State.ShortBreak;
      this.timeLeft = this.clockService.sBreakTime;
    }
  }

  public onSwitchToLBreak(): void {
    if (this.state !== State.LongBreak) {
      this.state = State.LongBreak;
      this.timeLeft = this.clockService.lBreakTime;
    }
  }

  public onStart(): void {
    const aSecond = 1000;
    this.handle = setInterval(() => {
      this.timeLeft -= aSecond;
    }, aSecond);
  }

  public onStop(): void {
    clearInterval(this.handle);
  }
}
