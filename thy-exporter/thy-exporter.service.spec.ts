import { TestBed } from '@angular/core/testing';

import { ThyExporterService } from './thy-exporter.service';

describe('ThyExporterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyExporterService = TestBed.get(ThyExporterService);
    expect(service).toBeTruthy();
  });
});
