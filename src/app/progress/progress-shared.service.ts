import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ProgressExercise} from "./models/progress-exercise";

@Injectable({
  providedIn: 'root'
})
export class ProgressSharedService {
  progressExerciseMap$ = new Subject<Map<string, ProgressExercise>>();

  shareProgress (progress: Map<string, ProgressExercise>) {
    this.progressExerciseMap$.next(progress);
  }

}
