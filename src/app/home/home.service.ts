import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Exercise} from "../user/models/exercise";
import {ProgressChartsHome} from "../progress/models/progress-charts-home";
import {ProgressCounterHome} from "../progress/models/Progress-counter-home";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLastExercise(user_id: string): Observable<Exercise> {
    return this.http.get<Exercise>(this.apiUrl + "/api/" + user_id + "/progress/lastexercise");
  }

  getCounterHome(user_id: string): Observable<ProgressCounterHome> {
    return this.http.get<ProgressCounterHome>(this.apiUrl + "/api/" + user_id + "/progress/counterHome");
  }
}
