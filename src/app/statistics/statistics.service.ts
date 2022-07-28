import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ProgressChartsHome} from "../progress/models/progress-charts-home";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProgressStatistics} from "../progress/models/progress-statistics";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getChartsHome(user_id: string): Observable<ProgressChartsHome> {
    return this.http.get<ProgressChartsHome>(this.apiUrl + "/api/" + user_id + "/progress/chartshome");
  }

  getStatistics(user_id: string, month: number, year: number): Observable<ProgressStatistics> {
    return this.http.get<ProgressStatistics>(this.apiUrl + "/api/" + user_id + "/statistic/" + month + "/" + year);
  }
}
