import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProgressLevel} from "./models/progress-level";
import {ProgressExercise} from "./models/progress-exercise";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private apiUrl: string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) { }

  getProgressLevelListByUser(user_id: number): Observable<ProgressLevel[]> {
    return this.http.get<ProgressLevel[]>(this.apiUrl + user_id + '/progress');
  }

  getProgressExerciseByUser(user_id: number, level_id: number): Observable<ProgressExercise[]> {
    return this.http.get<ProgressExercise[]>(this.apiUrl + user_id + '/progress/' + level_id);
  }
}
