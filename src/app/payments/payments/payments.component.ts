import { Component, OnInit } from '@angular/core';
import {loadStripe} from "@stripe/stripe-js";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../user/models/user";
import {UserService} from "../../shared-module/services/user.service";
import {AuthenticationService} from "../../auth/authentication.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  stripePromise = loadStripe(environment.stripe);
  user: User

  purchaseStarted = false;
  monthlyPriceId = "price_1Mb7eLLJcGDwiGcWljBHFsWC";
  private subUrl: string = environment.subUrl;
  private apiUrl: string = environment.apiUrl;


  constructor(private http: HttpClient,
              private userServiceShow: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.userServiceShow.userCurrent$.subscribe((user) => {
      this.user = user
    });
  }

  async checkoutMonthly(): Promise<void> {
    this.purchaseStarted = true;
    this.startSubscriptionCheckoutSession(this.monthlyPriceId);

  }

  private async startSubscriptionCheckoutSession(pricingPlanId: string): Promise<void> {
    const checkout = {
      priceId: pricingPlanId,
      cancelUrl: this.subUrl + "/stripe-checkout/purchaseResultCancel",
      successUrl: this.subUrl + "/stripe-checkout/purchaseResultSuccess",
      email: this.user.email,
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
