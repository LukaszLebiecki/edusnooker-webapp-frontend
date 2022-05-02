import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {LoginComponent} from "./login.component";


const LOGIN_ROUTES: Route[] = [
  {path: 'login', component: LoginComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(LOGIN_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class LoginRoutingModule {}
