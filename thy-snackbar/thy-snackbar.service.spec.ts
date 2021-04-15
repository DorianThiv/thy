import { TestBed } from '@angular/core/testing';

import { ThySnackbarService } from './thy-snackbar.service';

describe('ThySnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThySnackbarService = TestBed.get(ThySnackbarService);
    expect(service).toBeTruthy();
  });
});
