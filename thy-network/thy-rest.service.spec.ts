import { TestBed } from '@angular/core/testing';
import { ThyRestService } from './thy-rest.service';

describe('RestService', () => {
  let service: ThyRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThyRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
