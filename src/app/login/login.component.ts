import {Component} from '@angular/core';
import {AuthenticationService} from "../auth/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login = '';
  password = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }


  onSubmit() {
    // this.authenticationService.login(this.login, this.password)
    //   .then(this.onSubmitSuccess.bind(this), this.onSubmitFailure);
  }

  private onSubmitSuccess() {
    this.router.navigate(['/home']);
  }

  private onSubmitFailure() {
    console.log('Login or password is incorect, please try again!');
  }
}
