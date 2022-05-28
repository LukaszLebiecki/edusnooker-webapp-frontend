import { Component, OnInit } from '@angular/core';
import {Role} from "../role/role.enum";
import {AuthenticationService} from "../auth/authentication.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService ) { }

  ngOnInit(): void {
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }
}
