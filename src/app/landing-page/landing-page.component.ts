import {Component, OnInit} from '@angular/core';
import {NotificationType} from "../notification/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../notification/notification.service";
import {Subscription} from "rxjs";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {CustomHttpResponse} from "../http/models/customHttpResponse";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public refreshing: boolean;
  private subscriptions: Subscription[] = [];
  public not: string = '';

  constructor(private userService: UserService,
              private router: Router,
              private notificationService: NotificationService,) {
  }

  ngOnInit(): void {
  }

  public onAddNewsletter(emailForm: NgForm): void {
    const not = emailForm.value['not-newsletter']
    if (not !== '') {
      this.not = '';
    } else {
      this.refreshing = true;
      const email = emailForm.value['email-newsletter'];
      this.subscriptions.push(
        this.userService.addNewsletter(email).subscribe(
          (response: CustomHttpResponse) => {
            this.sendNotification(NotificationType.SUCCESS, response.message)
            this.refreshing = false;
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, "Invalid format");
            this.refreshing = false;
          },
          () => emailForm.reset()
        )
      )
    }
  }

  private sendNotification(notificationType: NotificationType, message: any): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred, Please try again.');
    }
  }

}
