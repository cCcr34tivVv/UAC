import { TestBed } from '@angular/core/testing';

import { UacService } from './uac.service';

describe('UacService', () => {
  let service: UacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
