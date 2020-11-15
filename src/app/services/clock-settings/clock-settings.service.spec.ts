import { TestBed } from '@angular/core/testing';
import { State } from 'src/models/enums/state.enum';

import { ClockSettingsService } from './clock-settings.service';

describe('ClockService', () => {
  let service: ClockSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets the time for a given state', () => {
    // assert
    expect(service.getTime(State.Working)).toBe(service.minToMs(25));
    expect(service.getTime(State.ShortBreak)).toBe(service.minToMs(5));
    expect(service.getTime(State.LongBreak)).toBe(service.minToMs(15));
  });

  it('sets the time for a given state', () => {
    // arrange
    const newMins = 27;
    const state = State.Working;

    // act
    service.setTime(state, newMins);

    // assert
    expect(service.getTime(state)).toBe(service.minToMs(newMins));
  });

  it('converts minutes to milliseconds', () => {
    // arrange
    const minutes = 10;
    const expectedResults = minutes * 60 * 1000;

    // assert
    expect(service.minToMs(10)).toBe(expectedResults);
  });
});
