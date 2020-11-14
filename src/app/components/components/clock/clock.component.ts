import { Component, OnInit } from '@angular/core';
import { ClockSettingsService } from 'src/app/services/clock-settings/clock-settings.service';
import { State } from 'src/models/enums/state.enum';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  public timeLeft: number;
  public state: State;

  constructor(private clockService: ClockSettingsService) {
    this.state = State.Working;
    this.timeLeft = this.clockService.workingTime;
  }

  ngOnInit(): void {}

}
