import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClockSettingsService } from 'src/app/services/clock-settings/clock-settings.service';
import { State } from 'src/models/enums/state.enum';

import { ClockComponent } from './clock.component';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;
  let clockSettings: ClockSettingsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockComponent ],
      providers: [DatePipe, ClockSettingsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    clockSettings = TestBed.inject(ClockSettingsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is set to working state upon being built', () => {
    // assert
    expect(component.state).toBe(State.Working);
    expect(component.timeLeft).toBe(clockSettings.getTime(State.Working));
  });

  it('switches to corresponding state and time', () => {
    // arrange
    const lBreakString = 'LongBreak';
    component.state = State.Working;

    // act
    component.onSwitchState(lBreakString);

    // assert
    expect(component.state).toBe(State.LongBreak);
    expect(component.timeLeft).toBe(clockSettings.getTime(State.LongBreak));
  });

  it('time left decreases when starting timer', () => {
    // arrange
    const currentTime = component.timeLeft;
    jasmine.clock().install();

    // act
    component.onStart();
    jasmine.clock().tick(1001);

    // assert
    expect(currentTime).toBeGreaterThan(component.timeLeft);
  });

  it('timer stops when clicking stop', () => {
    // arrange
    component.onStart();
    jasmine.clock().tick(1001);
    const currentTime = component.timeLeft;

    component.onStop();
    jasmine.clock().tick(1001);

    // assert
    expect(currentTime).toBe(component.timeLeft);
  });
});
