import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {NotificationService} from "../notification/notification.service";
import {AuthenticationService} from "../auth/authentication.service";
import {User} from "../user/models/user";
import {Router} from "@angular/router";
import {NotificationType} from "../notification/notification-type.enum";
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {BehaviorSubject, Subscription} from "rxjs";
import {FileUploadStatus} from "./models/file-upload.status";
import {SubSink} from "subsink";
import {Role} from "../role/role.enum";
import {CustomHttpResponse} from "../http/models/customHttpResponse";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  public user: User;
  public refreshing: boolean;
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users: User[];
  public selectedUser: User;
  private subscriptions: Subscription[] = [];
  private profileImage: File;
  private fileName: null;
  public editUser = new User();
  public currentUsername: string;
  public fileStatus = new FileUploadStatus();
  public password: string = '';
  private subUrl: string = environment.subUrl;
  private apiUrl: string = environment.apiUrl;
  purchaseStarted = false;
  public progressMode;

  constructor(private userService: UserService,
              private http: HttpClient,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.loadProgressModeByUser(this.user.userId)
  }

  loadProgressModeByUser(user_id:string) {
    this.http
      .get(this.apiUrl + '/get/progressmode/' + user_id, )
      .subscribe((data: any) => {
        this.progressMode = data.progressMode;
      });
  }

  public onProgressMode() {
    if (this.progressMode == false) {
      this.progressMode = true;
    } else {
      this.progressMode = false;
    }

    const formData = new FormData();
    formData.append('currentUserId', this.user.userId);
    formData.append('progressMode', JSON.stringify(this.progressMode));

    this.subscriptions.push(
      this.userService.updateProgressMode(formData)
        .subscribe((progress) => {
          if (this.progressMode == true) {
            this.sendNotification(NotificationType.SUCCESS, "Progress Mode Enable")
          } else {
            this.sendNotification(NotificationType.DEFAULT, "Progress Mode Disabled")
          }
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          }
        )
    )
  }

  async subPanel(): Promise<void> {
    this.purchaseStarted = true;
    this.startCustomerPanelSession();
  }

  private async startCustomerPanelSession(): Promise<void> {
    const customerPanel = {
      customerId: this.user.stripeId,
      returnUrl: this.subUrl + "/myaccount",
    };

    this.http
      .post(this.apiUrl + '/api/create-customer-portal-session', customerPanel)
      .subscribe((data: any) => {
        window.location.href = data.url
      });
  }

  public deleteMyAccount(username: string): void {
    if (this.user.email === this.password) {
      this.subscriptions.push(
        this.userService.deleteMyAccount(username).subscribe(
          (response: CustomHttpResponse) => {
            this.sendNotification(NotificationType.SUCCESS, response.message);
            this.getUsers(false);
            this.password = '';
            this.logout();
          }
        )
      )
    } else {
      this.sendNotification(NotificationType.ERROR, 'Entered data not correct');
    }
  }

  public clearFieldPassword() {
    this.password = '';
  }

  public logout() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  public updateProfileImage(): void {
    this.clickButton('profile-image-input');
  }

  public onUpdateProfileImage() {
    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('profileImage', this.profileImage);
    this.subs.add(
      this.userService.updateProfileImage(formData).subscribe(
        (event: HttpEvent<any>) => {
          this.reportUploadProgress(event);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.fileStatus.status = 'done';
        }
      )
    );
  }

  public onProfileImageChange(event: any): void {
    this.fileName = event.target.files[0].name;
    this.profileImage = event.target.files[0];
  }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subs.add(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );
  }

  public onUpdateCurrentUser(user: User): void {
    this.refreshing = true;
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    const formData = this.userService.createUserToUserFormDate(this.currentUsername, this.user, this.profileImage);
    this.subs.add(
      this.userService.updateUserToUser(formData).subscribe(
        (response: User) => {
          this.authenticationService.addUserToLocalCache(response);
          this.fileName = null;
          this.profileImage = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updated successfully`)
          this.refreshing = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = true;
          this.profileImage = null;
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

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  private reportUploadProgress(event: HttpEvent<any>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
        this.fileStatus.status = 'progress';
        break;
      case HttpEventType.Response:
        if (event.status === 200) {
          this.user.profileImageUrl = `${event.body.profileImageUrl}?time=${new Date().getTime()}`;
          this.sendNotification(NotificationType.SUCCESS, `${event.body.firstName}\'s profile image updated successfully`);
          this.fileStatus.status = 'done';
          break;
        } else {
          this.sendNotification(NotificationType.ERROR, `Unable to upload image. Please try again`);
          break;
        }
      default:
        `Finished all processes`;
    }
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  public get isSubscribe(): boolean {
    return this.getUserRole() === Role.BASIC || this.getUserRole() === Role.PREMIUM || this.getUserRole() === Role.ADMIN;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
