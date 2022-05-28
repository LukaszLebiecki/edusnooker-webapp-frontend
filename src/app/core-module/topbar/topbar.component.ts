import {Component, OnChanges, OnInit} from '@angular/core';
import {User} from "../../user/models/user";
import {AuthenticationService} from "../../auth/authentication.service";
import {UserService} from "../../shared-module/services/user.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  public user: User

  constructor(private userServiceShow: UserService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.userServiceShow.userCurrent$.subscribe((user) => {
      this.user = user
    });
  }

}
