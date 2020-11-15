import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { State } from 'src/models/enums/state.enum';

import { TitleService } from './title.service';

describe('TitleService', () => {
  let service: TitleService;
  let datePipe: DatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe]
    });
    service = TestBed.inject(TitleService);
    datePipe = TestBed.inject(DatePipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sets working state title', () => {
    // arrange
    const state: State = State.Working;
    const time = 15 * 60 * 1000;

    // act
    service.setTitle(state, time);

    // assert
    expect(service.getTitle()).toBe('Working | 15:00');
  });

  it('sets short break state title', () => {
    // arrange
    const state: State = State.ShortBreak;
    const time = 5 * 60 * 1000;

    // act
    service.setTitle(state, time);

    // assert
    expect(service.getTitle()).toBe('Break | 05:00');
  });

  it('sets long break state title', () => {
    // arrange
    const state: State = State.LongBreak;
    const time = 15 * 60 * 1000;

    // act
    service.setTitle(state, time);

    // assert
    expect(service.getTitle()).toBe('Break | 15:00');
  });});
