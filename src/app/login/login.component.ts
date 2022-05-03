import {Component} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
  }


  onSubmit() {
    this.authService.login(this.login, this.password)
      .then(this.onSubmitSuccess.bind(this), this.onSubmitFailure);
  }

  private onSubmitSuccess() {
    this.router.navigate(['/home']);
  }

  private onSubmitFailure() {
    console.log('Login or password is incorect, please try again!');
  }
}
