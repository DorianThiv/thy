import { TestBed } from '@angular/core/testing';

import { ThyConverterService } from './thy-converter.service';

describe('ThyConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyConverterService = TestBed.get(ThyConverterService);
    expect(service).toBeTruthy();
  });
});
