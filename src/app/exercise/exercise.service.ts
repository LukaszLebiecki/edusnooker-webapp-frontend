import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExerciseList} from "./models/exercise-list";
import {Exercise} from "../user/models/exercise";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl: string = "http://localhost:8080/api/level/"

  constructor(private http: HttpClient) {

  }

  getExerciseList(level: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl + level + '/exercise');
  }


}
