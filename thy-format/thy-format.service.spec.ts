import { TestBed } from '@angular/core/testing';

import { ThyFormatService } from './thy-format.service';

describe('ThyFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyFormatService = TestBed.get(ThyFormatService);
    expect(service).toBeTruthy();
  });
});
