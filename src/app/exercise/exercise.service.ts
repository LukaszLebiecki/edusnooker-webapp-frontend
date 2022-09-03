import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Exercise} from "../user/models/exercise";
import {environment} from "../../environments/environment";
import {ProgressUser} from "../progress/models/progress-user";
import {FavoriteSlot} from "./models/favorite-slot";

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

  getExerciseSlotOne(userId: string): Observable<Exercise> {
    return this.http.get<Exercise>(this.apiUrl + "/api/" + userId + "/exercise/slot/one");
  }

  getExerciseSlotTwo(userId: string): Observable<Exercise> {
    return this.http.get<Exercise>(this.apiUrl + "/api/" + userId + "/exercise/slot/two");
  }

  getExerciseSlotThree(userId: string): Observable<Exercise> {
    return this.http.get<Exercise>(this.apiUrl + "/api/" + userId + "/exercise/slot/three");
  }

  updateSlotOne(formData: FormData): Observable<FavoriteSlot> {
    return this.http.post<FavoriteSlot>(`${this.apiUrl}/user/update/slotone`, formData);
  }

  updateSlotTwo(formData: FormData): Observable<FavoriteSlot> {
    return this.http.post<FavoriteSlot>(`${this.apiUrl}/user/update/slottwo`, formData);
  }

  updateSlotThree(formData: FormData): Observable<FavoriteSlot> {
    return this.http.post<FavoriteSlot>(`${this.apiUrl}/user/update/slotthree`, formData);
  }

  addProgressUser(formData: FormData): Observable<ProgressUser> {
    return this.http.post<ProgressUser>(`${this.apiUrl}/api/progress/add`, formData);
  }

  createProgressUserFormDate(progressUser: ProgressUser): FormData {
    const formData = new FormData();
    formData.append('idExercise', progressUser.idExercise);
    formData.append('numberLevel', JSON.stringify(progressUser.numberLevel));
    formData.append('numberOfPointsToPassed', JSON.stringify(progressUser.numberOfPointsToPassed));
    formData.append('resultNumberOfPoint', JSON.stringify(progressUser.resultNumberOfPoint));
    formData.append('dateTimeExercise', JSON.stringify(progressUser.dateTimeExercise));
    formData.append('userId', progressUser.userId);
    return formData;
  }

  createFavoriteSlotFormDate(favoriteSlot: FavoriteSlot):FormData {
    const formData = new FormData();
    formData.append('currentUserId', favoriteSlot.currentUserId);
    formData.append('favoriteSlot', favoriteSlot.favoriteSlot);
    return formData;
  }


}
