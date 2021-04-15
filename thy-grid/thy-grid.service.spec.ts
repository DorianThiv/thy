import { TestBed } from '@angular/core/testing';

import { ThyGridService } from './thy-grid.service';

describe('ThyGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyGridService = TestBed.get(ThyGridService);
    expect(service).toBeTruthy();
  });
});
