import { TestBed } from '@angular/core/testing';

import { ThyTokenInterceptorService } from './thy-token-interceptor.service';

describe('TokenInterceptorService', () => {
  let service: ThyTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThyTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
