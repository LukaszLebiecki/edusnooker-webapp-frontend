import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CheckoutSession} from "./model/CheckoutSession";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  startSubscriptionCheckoutSession(pricingPlanId: string): Observable<CheckoutSession> {
    return this.http.post<CheckoutSession>(this.apiUrl + "/api/checkout", {
      pricingPlanId,

    })
  }

}
