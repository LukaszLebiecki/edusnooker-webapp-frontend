import {Component, OnInit} from '@angular/core';
import {NotificationType} from "../notification/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../notification/notification.service";
import {Subscription} from "rxjs";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {CustomHttpResponse} from "../http/models/customHttpResponse";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public email: string = '';
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private notificationService: NotificationService,) {
  }

  ngOnInit(): void {
  }

  public onAddNewsletter(email: string): void {

    this.subscriptions.push(
      this.userService.addNewsletter(email).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message)
          this.email = "";
          this.router.navigateByUrl('/');
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
