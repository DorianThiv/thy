import { TestBed, inject } from '@angular/core/testing';

import { ThyUtilsFunctionsService } from './thy-utils-functions.service';

describe('ThyUtilsFunctionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThyUtilsFunctionsService]
    });
  });

  it('should be created', inject([ThyUtilsFunctionsService], (service: ThyUtilsFunctionsService) => {
    expect(service).toBeTruthy();
  }));
});
