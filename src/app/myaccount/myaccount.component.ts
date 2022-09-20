import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {NotificationService} from "../notification/notification.service";
import {AuthenticationService} from "../auth/authentication.service";
import {User} from "../user/models/user";
import {Router} from "@angular/router";
import {NotificationType} from "../notification/notification-type.enum";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {BehaviorSubject, Subscription} from "rxjs";
import {FileUploadStatus} from "./models/file-upload.status";
import {SubSink} from "subsink";
import {Role} from "../role/role.enum";
import {CustomHttpResponse} from "../http/models/customHttpResponse";
import {NgForm} from "@angular/forms";


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
  password: string = '';

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
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
    const formData = this.userService.createUserFormDate(this.currentUsername, this.user, this.profileImage);
    this.subs.add(
      this.userService.updateUser(formData).subscribe(
        (response: User) => {
          this.authenticationService.addUserToLocalCache(response);
          this.getUsers(false);
          this.fileName = null;
          this.profileImage = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updated successfully`)
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
