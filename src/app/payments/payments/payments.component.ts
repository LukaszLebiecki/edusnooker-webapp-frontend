import { Component, OnInit } from '@angular/core';
import {CheckoutService} from "../../checkout/checkout.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  purchaseStarted = false;

  constructor(private checkout: CheckoutService) { }

  ngOnInit(): void {
  }

  subscribeToPlan() {
    this.purchaseStarted = true;
    this.checkout.startSubscriptionCheckoutSession("prod_MYjxF5WLC0Ehkm")
      .subscribe(
        () => {
          console.log("Stripe checkout session initialized ...");
        },
        error => {
          console.log("Error creating checkout session", error);
          this.purchaseStarted = false;
        }
      );
  }

}
