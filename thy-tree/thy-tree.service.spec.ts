import { TestBed } from '@angular/core/testing';

import { ThyTreeService } from './thy-tree.service';

describe('ThyTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyTreeService = TestBed.get(ThyTreeService);
    expect(service).toBeTruthy();
  });
});
