import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExerciseList} from "./models/exercise-list";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl: string = "http://localhost:8080/api/level/"

  constructor(private http: HttpClient) {

  }

  getExerciseList(level: number): Observable<ExerciseList[]> {
    return this.http.get<ExerciseList[]>(this.apiUrl + level + '/exercise');
  }
}
