import { TestBed } from '@angular/core/testing';

import { ProgressSharedService } from './progress-shared.service';

describe('ProgressSharedService', () => {
  let service: ProgressSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
