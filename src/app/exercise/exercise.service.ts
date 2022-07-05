import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExerciseList} from "./models/exercise-list";
import {Exercise} from "../user/models/exercise";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  getExerciseList(level: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl + "/api/level/" + level + '/exercise');
  }


}
