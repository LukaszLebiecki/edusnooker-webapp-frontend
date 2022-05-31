import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {CustomHttpResponse} from "../http/models/customHttpResponse";
import {NotificationType} from "../notification/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {NotificationService} from "../notification/notification.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  public refreshing: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  public onResetPassword(emailForm: NgForm): void {
    this.refreshing = true;
    const emailAddress = emailForm.value['reset-password-email'];
    this.subscriptions.push(
      this.userService.resetPassword(emailAddress).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.refreshing = false;
          this.router.navigateByUrl('/login');
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.WARNING, error.error.message);
          this.refreshing = false;
        },
        () => emailForm.reset()
      )
    )
  }

  private sendNotification(notificationType: NotificationType, message: any): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred, Please try again.');
    }
  }
}
