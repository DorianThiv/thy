import { TestBed } from '@angular/core/testing';

import { ThyDateInterceptorService } from './thy-date-interceptor.service';

describe('ThyDateInterceptorService', () => {
  let service: ThyDateInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThyDateInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
