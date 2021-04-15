import { TestBed } from '@angular/core/testing';

import { ThyHeatmapService } from './thy-heatmap.service';

describe('ThyHeatmapService', () => {
  let service: ThyHeatmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThyHeatmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
