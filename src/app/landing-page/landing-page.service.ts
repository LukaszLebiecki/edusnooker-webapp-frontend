import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CustomHttpResponse} from "../http/models/customHttpResponse";

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public addNewsletter(email: string): Observable<CustomHttpResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/api/newsletter/add/${email}`);
  }

}
