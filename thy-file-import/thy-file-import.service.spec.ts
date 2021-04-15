import { TestBed } from '@angular/core/testing';

import { ThyFileImportService } from './thy-file-import.service';

describe('ThyFileImportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyFileImportService = TestBed.get(ThyFileImportService);
    expect(service).toBeTruthy();
  });
});
