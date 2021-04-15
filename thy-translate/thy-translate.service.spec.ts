import { TestBed } from '@angular/core/testing';

import { ThyTranslateService } from './thy-translate.service';

describe('ThyTranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyTranslateService = TestBed.get(ThyTranslateService);
    expect(service).toBeTruthy();
  });
});
