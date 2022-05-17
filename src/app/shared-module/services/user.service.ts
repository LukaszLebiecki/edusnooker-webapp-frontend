import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {User} from "../../user/models/user";
import {AuthenticationService} from "../../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCurrent$ = new Subject<User>();

  showUser(user: User): void {
    return this.userCurrent$.next(user);
  }




}
