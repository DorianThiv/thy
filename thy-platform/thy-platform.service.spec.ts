import { TestBed } from '@angular/core/testing';

import { ThyPlatformService } from './thy-platform.service';

describe('ThyPlatformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyPlatformService = TestBed.get(ThyPlatformService);
    expect(service).toBeTruthy();
  });
});
