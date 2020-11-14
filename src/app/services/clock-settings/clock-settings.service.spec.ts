import { TestBed } from '@angular/core/testing';

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
});
