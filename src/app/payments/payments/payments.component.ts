import { Component, OnInit } from '@angular/core';
import {loadStripe} from "@stripe/stripe-js";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  stripePromise = loadStripe(environment.stripe);

  purchaseStarted = false;
  monthlyPriceId = "price_1Lq0ncLJcGDwiGcWntdz7ARz";
  private subUrl: string = environment.subUrl;
  private apiUrl: string = environment.apiUrl;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  async checkoutMonthly(): Promise<void> {
    this.purchaseStarted = true;
    this.startSubscriptionCheckoutSession(this.monthlyPriceId);

  }

  private async startSubscriptionCheckoutSession(pricingPlanId: string): Promise<void> {
    const checkout = {
      priceId: pricingPlanId,
      cancelUrl: this.subUrl + "/cancel",
      successUrl: this.subUrl + "/success",
    };
    const stripe = await this.stripePromise;

    this.http
      .post(this.apiUrl + '/api/checkout', checkout)
      .subscribe((data: any) => {
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
  }

}
