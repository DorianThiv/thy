import { TestBed } from '@angular/core/testing';

import { ThyXmlService } from './thy-xml.service';

describe('ThyXmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThyXmlService = TestBed.get(ThyXmlService);
    expect(service).toBeTruthy();
  });
});
