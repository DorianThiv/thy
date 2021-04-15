import { TestBed } from '@angular/core/testing';

import { ThyFileSaverService } from './thy-file-saver.service';

describe('ThyFileSaverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyFileSaverService = TestBed.get(ThyFileSaverService);
    expect(service).toBeTruthy();
  });
});
