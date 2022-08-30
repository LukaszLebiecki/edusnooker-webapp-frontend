import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProgressLevel} from "./models/progress-level";
import {ProgressExercise} from "./models/progress-exercise";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProgressLevelListByUser(user_id: string): Observable<ProgressLevel[]> {
    return this.http.get<ProgressLevel[]>(this.apiUrl + "/api/" + user_id + '/progress');
  }

  getProgressExerciseByUser(user_id: string, level_id: number): Observable<ProgressExercise[]> {
    return this.http.get<ProgressExercise[]>(this.apiUrl + "/api/" + user_id + '/progress/' + level_id);
  }

  getProgressExerciseAllByUser(user_id: string): Observable<ProgressExercise[]> {
    return this.http.get<ProgressExercise[]>(this.apiUrl + "/api/" + user_id + '/progress/all');
  }
}
