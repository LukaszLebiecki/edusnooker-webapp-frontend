import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Exercise} from "../user/models/exercise";
import {environment} from "../../environments/environment";
import {ProgressUser} from "../progress/models/progress-user";

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

  addProgressUser(formData: FormData): Observable<ProgressUser> {
    return this.http.post<ProgressUser>(`${this.apiUrl}/api/progress/add`, formData);
  }

  createProgressUserFormDate(progressUser: ProgressUser): FormData {
    const formData = new FormData();
    formData.append('idExercise', progressUser.idExercise)
    formData.append('numberLevel', JSON.stringify(progressUser.numberLevel));
    formData.append('numberOfPointsToPassed', JSON.stringify(progressUser.numberOfPointsToPassed));
    formData.append('resultNumberOfPoint', JSON.stringify(progressUser.resultNumberOfPoint));
    formData.append('dateTimeExercise', JSON.stringify(progressUser.dateTimeExercise));
    formData.append('userId', progressUser.userId);
    return formData;
  }


}
