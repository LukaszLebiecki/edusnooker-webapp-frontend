import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ProgressExercise} from "./models/progress-exercise";

@Injectable({
  providedIn: 'root'
})
export class ProgressSharedService {
  progressExerciseMap$ = new Subject<Map<number, ProgressExercise>>();

  shareProgress (progress: Map<number, ProgressExercise>) {
    this.progressExerciseMap$.next(progress);
  }

}
