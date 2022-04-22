import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Level} from "./models/level";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class LevelService {

  private apiUrl: string = "http://localhost:8080/api"

  constructor(private http: HttpClient) {
  }

  getLevels(id: number): Observable<Level> {
    return this.http.get<Level>(this.apiUrl + '/level/' + id);
  }


}
