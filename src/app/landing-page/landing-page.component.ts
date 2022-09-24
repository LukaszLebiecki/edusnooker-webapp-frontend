import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Exercise} from "../user/models/exercise";
import {NotificationType} from "../notification/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {LandingPageService} from "./landing-page.service";
import {SubSink} from "subsink";
import {NotificationService} from "../notification/notification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public email: string = '';
  private subscriptions: Subscription[] = [];

  constructor(private landingPageService: LandingPageService,
              private notificationService: NotificationService,) {
  }

  ngOnInit(): void {
  }

  public onAddNewsletter(email: string): void {
    this.subscriptions.push(
      this.landingPageService.addNewsletter(email).subscribe(
        () => {
          this.sendNotification(NotificationType.SUCCESS, `Your sign up was successful`)
          this.email = "";
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  private sendNotification(notificationType: NotificationType, message: any): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred, Please try again.');
    }
  }

}
