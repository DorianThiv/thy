import { TestBed } from '@angular/core/testing';

import { ThyObjects2Service } from './thy-objects2.service';

describe('ThyObjects2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyObjects2Service = TestBed.get(ThyObjects2Service);
    expect(service).toBeTruthy();
  });
});
