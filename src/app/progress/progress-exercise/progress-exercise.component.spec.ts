import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressExerciseComponent } from './progress-exercise.component';

describe('ProgressExerciseComponent', () => {
  let component: ProgressExerciseComponent;
  let fixture: ComponentFixture<ProgressExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
