import { TestBed } from '@angular/core/testing';
import { ThyNetworkService } from './thy-network.service';

describe('NetworkService', () => {
  let service: ThyNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThyNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
