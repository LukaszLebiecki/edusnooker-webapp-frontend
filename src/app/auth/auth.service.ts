import { Injectable } from '@angular/core';
import {LayoutService} from "../shared-module/services/layout.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private layoutService: LayoutService) {
  }

  // todo fake credentials
  private credentials = {
    login: 'admin@admin',
    password: 'admin'
  };

  private isUserLoggedIn = false;

  // todo fake login
  login (login: string, password: string) {
    return new Promise((resolve, reject) => {
      if (login === this.credentials.login && password === this.credentials.password) {
        this.isUserLoggedIn = true;
        this.layoutService.showSidebar();
        resolve(this.credentials);
      } else {
        reject();
      }
    })
  }

  logout() {
    this.isUserLoggedIn = false;
    this.layoutService.hideSidebar();
  }

  isLoggedIn() {
    return this.isUserLoggedIn;
  }
}
