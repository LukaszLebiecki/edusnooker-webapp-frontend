import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProgressLevel} from "../progress/models/progress-level";
import {Exercise} from "../user/models/exercise";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLastExercise(user_id: string): Observable<Exercise> {
    return this.http.get<Exercise>(this.apiUrl + "/api/" + user_id + '/progress/lastexercise');
  }
}
