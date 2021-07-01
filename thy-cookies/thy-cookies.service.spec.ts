import { TestBed } from '@angular/core/testing';

import { ThyCookiesService } from './thy-cookies.service';

describe('ThyCookiesService', () => {
  let service: ThyCookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThyCookiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
