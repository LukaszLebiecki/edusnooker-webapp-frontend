import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Level} from "./models/level";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LevelService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(this.apiUrl + '/api/level');
  }

  getLevelsDemo(): Observable<Level[]> {
    return this.http.get<Level[]>(this.apiUrl + '/api/level/demo');
  }


}
