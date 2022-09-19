import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../user/models/user";
import {CustomHttpResponse} from "../http/models/customHttpResponse";
import {Exercise} from "./models/exercise";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  public deleteUser(username: string): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${username}`);
  }

  public deleteMyAccount(username: string): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/deletemyaccount/${username}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public addExerciseToLocalCache(exercises: Exercise[]): void {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }

  public getUsersFromLocalCache(): User[] | null {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users') || '');
    }
    return null;
  }

  public getExercisesFromLocalCache(): Exercise[] | null {
    if (localStorage.getItem('exercises')) {
      return JSON.parse(localStorage.getItem('exercises') || '');
    }
    return null;
  }

  public createUserFormDate(loggedInUsername: string, user: User, profileImage: File): FormData {
    const fromData = new FormData();
    fromData.append('currentUsername', loggedInUsername);
    fromData.append('firstName', user.firstName);
    fromData.append('lastName', user.lastName);
    fromData.append('username', user.username);
    fromData.append('email', user.email);
    fromData.append('role', user.role);
    fromData.append('profileImage', profileImage);
    fromData.append('isActive', JSON.stringify(user.active));
    fromData.append('isNotLocked', JSON.stringify(user.notLocked));
  return fromData;
  }

  public getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.host}/api/exercise`);
  }

  public addExercise(formData: FormData): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.host}/api/exercise/add`, formData);
  }

  public updateExercise(formData: FormData): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.host}/api/exercise/update`, formData);
  }

  public deleteExercise(exerciseId: string): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/exercise/delete/${exerciseId}`);
  }

  public createExerciseFormDate(currentExerciseId: string, exercise: Exercise): FormData {
    const formData = new FormData();
    formData.append('currentExerciseId', exercise.exerciseId)
    formData.append('name', exercise.name);
    formData.append('description', exercise.description);
    formData.append('videoUrl', exercise.videoUrl);
    formData.append('img', exercise.img);
    formData.append('numberOfPointsToPassed', JSON.stringify(exercise.numberOfPointsToPassed));
    formData.append('maxPoints', JSON.stringify(exercise.maxPoints));
    formData.append('numberOfAttempts', JSON.stringify(exercise.numberOfAttempts));
    formData.append('numberOfStrokesInOneAttempt', JSON.stringify(exercise.numberOfStrokesInOneAttempt));
    formData.append('level', exercise.level);
    formData.append('isWhite', JSON.stringify(exercise?.white));
    formData.append('isRed', JSON.stringify(exercise?.red));
    formData.append('isYellow', JSON.stringify(exercise?.yellow));
    formData.append('isGreen', JSON.stringify(exercise.green));
    formData.append('isBrown', JSON.stringify(exercise.brown));
    formData.append('isBlue', JSON.stringify(exercise.blue));
    formData.append('isPink', JSON.stringify(exercise.pink));
    formData.append('isBlack', JSON.stringify(exercise.black));
    formData.append('isButtonPass', JSON.stringify(exercise.buttonPass));
    formData.append('isBonusPoint', JSON.stringify(exercise.bonusPoint));
    formData.append('bonusInfo', exercise.bonusInfo);
    formData.append('bonusNumberOfPoints', JSON.stringify(exercise.bonusNumberOfPoints));
    formData.append('length', JSON.stringify(exercise.length))
    return formData;
  }
}
