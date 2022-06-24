import {Component, Input, OnInit} from '@angular/core';
import {ProgressService} from "../progress.service";
import {ProgressExercise} from "../models/progress-exercise";
import {ActivatedRoute} from "@angular/router";
import {ProgressSharedService} from "../progress-shared.service";
import {AuthenticationService} from "../../auth/authentication.service";


@Component({
  selector: '[app-progress-exercise]',
  templateUrl: './progress-exercise.component.html',
  styleUrls: ['./progress-exercise.component.scss']
})
export class ProgressExerciseComponent implements OnInit {

  @Input() exercise: number = 5;
  progressExerciseMap: Map<number, ProgressExercise> = new Map<number, ProgressExercise>();
  user_id: string = "";
  levelId: number = +this.route.snapshot.params['id']

  constructor(private progressService: ProgressService,
              private progressSharedService: ProgressSharedService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user_id = this.getCurrentUserId();
    this.loadProgressExercise();
  }

  loadProgressExercise() {
    const id = +this.route.snapshot.params['id']
    this.progressService.getProgressExerciseByUser(this.user_id, id).subscribe((p) => {
      for (let exercise of p) {
        this.progressExerciseMap.set(exercise.idExercise, exercise);
        this.progressSharedService.shareProgress(this.progressExerciseMap);
      }
    });
  }

  private getCurrentUserId(): string {
    return this.authenticationService.getUserFromLocalCache().userId;
  }
}
