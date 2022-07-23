import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ProgressChartsHome} from "../progress/models/progress-charts-home";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getChartsHome(user_id: string): Observable<ProgressChartsHome> {
    return this.http.get<ProgressChartsHome>(this.apiUrl + "/api/" + user_id + "/progress/chartshome");
  }
}
