import { TestBed } from '@angular/core/testing';

import { HibaService } from './hiba.service';

describe('HibaService', () => {
  let service: HibaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HibaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
