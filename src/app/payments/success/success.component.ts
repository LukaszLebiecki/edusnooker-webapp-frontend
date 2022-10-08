import {Component, OnInit} from '@angular/core';
import {NotificationType} from "../../notification/notification-type.enum";
import {AuthenticationService} from "../../auth/authentication.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../notification/notification.service";


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit(): void {

  }

  public logout() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  private sendNotification(notificationType: NotificationType, message: any): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred, Please try again.');
    }
  }

}
