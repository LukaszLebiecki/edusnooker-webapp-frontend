import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProgressStatistics} from "../progress/models/progress-statistics";
import {ProgressYears} from "../progress/models/Progress-years";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStatistics(user_id: string, month: number, year: number): Observable<ProgressStatistics> {
    return this.http.get<ProgressStatistics>(this.apiUrl + "/api/" + user_id + "/statistic/" + month + "/" + year);
  }

  getYears(user_id: string): Observable<ProgressYears> {
    return this.http.get<ProgressYears>(this.apiUrl + "/api/" + user_id + "/statistic/years");
  }
}
