import { Component, OnInit } from '@angular/core';
import {ExerciseList} from "../models/exercise-list";
import {ExerciseService} from "../exercise.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.less']
})
export class ExerciseListComponent implements OnInit {

  exerciseList: ExerciseList[] = [];
  index: number = +this.route.snapshot.params['id']

  constructor( private exerciseService: ExerciseService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadExerciseList()
  }

  loadExerciseList() {
    const id = +this.route.snapshot.params['id']
    this.exerciseService.getExerciseList(id).subscribe((e) => this.exerciseList = e);
  }

}
