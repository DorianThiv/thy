import { TestBed, inject } from '@angular/core/testing';

import { ThyDialogsService } from './thy-dialogs.service';

describe('ThyDialogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThyDialogsService]
    });
  });

  it('should be created', inject([ThyDialogsService], (service: ThyDialogsService) => {
    expect(service).toBeTruthy();
  }));
});
