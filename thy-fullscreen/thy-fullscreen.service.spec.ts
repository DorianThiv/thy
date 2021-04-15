import { TestBed } from '@angular/core/testing';

import { ThyFullscreenService } from './thy-fullscreen.service';

describe('ThyFullscreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyFullscreenService = TestBed.get(ThyFullscreenService);
    expect(service).toBeTruthy();
  });
});
