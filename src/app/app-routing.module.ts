import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {FavoriteComponent} from "./exercise/favorite/favorite.component";
import {AuthGuard} from "./auth/auth.guard";
import {LevelListComponent} from "./level/level-list/level-list.component";
import {HomeComponent} from "./home/home/home.component";
import {RegisterComponent} from "./register/register.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {MyaccountComponent} from "./myaccount/myaccount.component";
import {ResetpasswordComponent} from "./resetpassword/resetpassword.component";

const APP_ROUTES: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'resetpassword', component: ResetpasswordComponent},
  {path: 'user/management', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'myaccount', component: MyaccountComponent, canActivate: [AuthGuard]},
  {path: 'level', component: LevelListComponent, canActivate: [AuthGuard]},
  {path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', pathMatch: 'full', redirectTo: '/login'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
