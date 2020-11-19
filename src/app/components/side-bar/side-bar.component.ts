import { Component } from '@angular/core';
import { ClockSettingsService } from 'src/app/services/clock-settings/clock-settings.service';
import { NumberFormat } from 'src/models/enums/number-format.enum';
import { State } from 'src/models/enums/state.enum';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  public isClosed = true;
  public times: object = {};

  constructor(public clockSettings: ClockSettingsService) {
    this.times = clockSettings.getTimeSettings(NumberFormat.Minutes);
  }

  public onToggle(): void {
    this.isClosed = !this.isClosed;
  }

  public onSave(): void {
    this.clockSettings.setTime(State.Working, this.times[State.Working]);
    this.clockSettings.setTime(State.ShortBreak, this.times[State.ShortBreak]);
    this.clockSettings.setTime(State.LongBreak, this.times[State.LongBreak]);
    this.clockSettings.onSettingsChange();
    this.isClosed = true;
  }
}
