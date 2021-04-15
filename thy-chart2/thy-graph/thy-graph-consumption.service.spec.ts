import { TestBed } from '@angular/core/testing';

import { ThyGraphConsumptionService } from './thy-graph-consumption.service';

describe('ThyGraphConsumptionService', () => {
  let service: ThyGraphConsumptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThyGraphConsumptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
