import { TestBed } from '@angular/core/testing';

import { ThyPeriodService } from './thy-period.service';

describe('ThyPeriodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyPeriodService = TestBed.get(ThyPeriodService);
    expect(service).toBeTruthy();
  });
});
