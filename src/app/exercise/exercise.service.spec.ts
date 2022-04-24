import { TestBed } from '@angular/core/testing';

import { ExerciseService } from './ecercise.service';

describe('EcerciseService', () => {
  let service: ExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
