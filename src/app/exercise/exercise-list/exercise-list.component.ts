import { Component, OnInit } from '@angular/core';
import {ExerciseList} from "../models/exercise-list";
import {ExerciseService} from "../exercise.service";
import {ActivatedRoute} from "@angular/router";
import {ProgressExercise} from "../../progress/models/progress-exercise";
import {ProgressSharedService} from "../../progress/progress-shared.service";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  exerciseList: ExerciseList[] = [];
  index: number = +this.route.snapshot.params['id']
  progressMap: Map<number, ProgressExercise> = new Map<number, ProgressExercise>();

  constructor( private exerciseService: ExerciseService,
               private progressSharedService: ProgressSharedService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.progressSharedService.progressExerciseMap$.subscribe((progress) => this.progressMap = progress);
    this.loadExerciseList()
  }

  loadExerciseList() {
    const id = +this.route.snapshot.params['id']
    this.exerciseService.getExerciseList(id).subscribe((e) => this.exerciseList = e);
  }


}
