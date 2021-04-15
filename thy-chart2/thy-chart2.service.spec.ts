import { TestBed } from '@angular/core/testing';

import { ThyChart2Service } from './thy-chart2.service';

describe('ThyChart2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyChart2Service = TestBed.get(ThyChart2Service);
    expect(service).toBeTruthy();
  });
});
