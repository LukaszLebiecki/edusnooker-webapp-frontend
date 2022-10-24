import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "./models/user";
import {UserService} from "./user.service";
import {NotificationService} from "../notification/notification.service";
import {NotificationType} from "../notification/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {CustomHttpResponse} from "../http/models/customHttpResponse";
import {AuthenticationService} from "../auth/authentication.service";
import {Role} from "../role/role.enum";
import {SubSink} from "subsink";
import {Exercise} from "./models/exercise";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users: User[];
  public exercises: Exercise[];
  public refreshing: boolean;
  public selectedUser: User;
  public selectedExercise: Exercise;
  private subscriptions: Subscription[] = [];
  private profileImage: File;
  private fileName: null;
  public editUser = new User();
  public editExercise = new Exercise();
  private currentUsername: string;
  private currentExerciseId: string;
  public deleteUser: string;
  public deleteExercise: string;
  public isLoading: boolean = false;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.getUsers(true);
    this.getExercises(true);
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  public writeDeleteUser(actualUser: string) {
    this.deleteUser = actualUser;
  }

  public writeDeleteExercise(actualExercise: string) {
    this.deleteExercise = actualExercise;
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

  public getExercises(showNotification: boolean): void {
    this.refreshing = true;
    this.subs.add(
      this.userService.getExercises().subscribe(
        (response: Exercise[]) => {
          this.userService.addExerciseToLocalCache(response);
          this.exercises = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} exercise(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );
  }

  public onSelectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    this.clickButton('openUserInfo');
  }

  public onSelectExercise(selectedExercise: Exercise): void {
    this.selectedExercise = selectedExercise;
    this.clickButton('openExerciseInfo');
  }

  public onProfileImageChange(event: any): void {
    this.fileName = event.target.files[0].name;
    this.profileImage = event.target.files[0];
  }

  public saveNewUser(): void {
    this.clickButton('new-user-save');
    this.isLoading = true;
  }

  public onAddNewUser(userForm: NgForm): void {
    const formData = this.userService.createUserFormDate(null, userForm.value, this.profileImage)
    this.subs.add(
      this.userService.addUser(formData).subscribe(
        (response: User) => {
          this.clickButton('new-user-close');
          this.getUsers(false);
          this.fileName = null;
          this.profileImage = null;
          userForm.reset();
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updated successfully`)
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
        }
      )
    );
  }

  public saveNewExercise(): void {
    this.clickButton('new-exercise-save');
  }

  public onAddNewExercise(exerciseForm: NgForm): void {
    const formData = this.userService.createExerciseFormDate(null, exerciseForm.value)
    this.subs.add(
      this.userService.addExercise(formData).subscribe(
        (response: Exercise) => {
          this.clickButton('new-exercise-close');
          this.getExercises(false);
          exerciseForm.reset();
          this.sendNotification(NotificationType.SUCCESS, `${response.exerciseId} ${response.name} updated successfully`)
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public searchUsers(searchTerm: string): void {
    const results: User[] = [];
    for (const user of this.userService.getUsersFromLocalCache()) {
      if (user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        user.userId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !searchTerm) {
      this.users = this.userService.getUsersFromLocalCache();
    }
  }

  public searchExercises(searchTerm: string): void {
    const results: Exercise[] = [];
    for (const exercise of this.userService.getExercisesFromLocalCache()) {
      if (exercise.exerciseId.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        exercise.level.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(exercise);
      }
    }
    this.exercises = results;
    if (results.length === 0 || !searchTerm) {
      this.exercises = this.userService.getExercisesFromLocalCache();
    }
  }

  public onUpdateUser(): void {
    const formData = this.userService.createUserFormDate(this.currentUsername, this.editUser, this.profileImage)
    this.subscriptions.push(
      this.userService.updateUser(formData).subscribe(
        (response: User) => {
          this.clickButton('edit-user-close');
          this.getUsers(false);
          this.fileName = null;
          this.profileImage = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updated successfully`)
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
        }
      )
    );
  }

  public onEditUser(editUser: User): void {
    this.editUser = editUser;
    this.currentUsername = editUser.username;
    this.clickButton('openUserEdit');
  }

  public onUpdateExercise(): void {
    const formData = this.userService.createExerciseFormDate(this.currentExerciseId, this.editExercise)
    this.subscriptions.push(
      this.userService.updateExercise(formData).subscribe(
        (response: Exercise) => {
          this.clickButton('edit-exercise-close');
          this.getExercises(false);
          this.sendNotification(NotificationType.SUCCESS, `${response.exerciseId} updated successfully`)
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  public onEditExercise(editExercise: Exercise): void {
    this.editExercise = editExercise;
    this.currentExerciseId = editExercise.exerciseId;
    this.clickButton('openExerciseEdit');
  }

  public onDeleteUser(username: string): void {
    this.subscriptions.push(
      this.userService.deleteUser(username).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getUsers(false);
          window.location.reload()
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

  public onDeleteExercise(exerciseId: string): void {
    this.subscriptions.push(
      this.userService.deleteExercise(exerciseId).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getExercises(false);
          window.location.reload();
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    )
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
