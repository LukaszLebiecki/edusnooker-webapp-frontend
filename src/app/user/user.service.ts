import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../user/models/user";
import {CustomHttpResponse} from "../http/models/customHttpResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] | null {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users') || '');
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
}
