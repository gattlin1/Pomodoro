import { Component, OnInit } from '@angular/core';
import { ClockSettingsService } from 'src/app/services/clock-settings/clock-settings.service';
import { TitleService } from 'src/app/services/title/title.service';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { State } from 'src/models/enums/state.enum';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  public timeLeft: number;
  public maxTime: number;
  public state: State;
  private handle: any;

  constructor(private clockService: ClockSettingsService,
              private titleService: TitleService,
              private notificationService: NotificationsService) {
    this.state = State.Working;
    this.updateTimes();
    this.titleService.setTitle(this.state, this.timeLeft);
  }

  ngOnInit(): void {
    if (this.clockService.settingsChangeSubscribe === undefined) {
      this.clockService.settingsChangeSubscribe = this.clockService.settingsChange.subscribe(
        () => {
          this.updateTimes();
          this.notificationService.requestPermission();
        }
      );
    }
  }

  public onSwitchState(state: string): void {
    const stateEnum: State = State[state];
    if (this.state !== stateEnum) {
      this.state = stateEnum;
      this.clearTimer();
      this.updateTimes();
      this.titleService.setTitle(this.state, this.timeLeft);
    }
  }

  public onStart(): void {
    if (this.timeLeft > 0) {
      const aSecond = 1000;
      this.handle = setInterval(() => {
        if (this.timeLeft - aSecond <= 0) {
          if (this.state === State.Working) {
            this.onSwitchState('ShortBreak');
            this.notificationService.create('Time to take a break!');
          } else {
            this.onSwitchState('Working');
            this.notificationService.create('Time to get to work!');
          }
        } else {
          this.timeLeft -= aSecond;
          this.titleService.setTitle(this.state, this.timeLeft);
        }
      }, aSecond);
    }
  }

  public onStop(): void {
    this.clearTimer();
  }

  private updateTimes(): void {
    this.timeLeft = this.clockService.getTime(this.state);
    this.maxTime = this.timeLeft;
  }

  private clearTimer(): void {
    clearInterval(this.handle);
  }
}
