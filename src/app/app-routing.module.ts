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
import {StatisticsComponent} from "./statistics/statistics.component";
import {TechniqueComponent} from "./technique/technique.component";
import {PaymentsComponent} from "./payments/payments/payments.component";
import {StatuteComponent} from "./statute/statute/statute.component";
import {PolicyComponent} from "./policy/policy/policy.component";
import {ContactComponent} from "./contact/contact/contact.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SuccessComponent} from "./payments/success/success.component";
import {CancelComponent} from "./payments/cancel/cancel.component";
import {MentalComponent} from "./mental/mental.component";
import {FitnessComponent} from "./fitness/fitness.component";
import {BasicroutineComponent} from "./basicroutine/basicroutine.component";
import {RodoComponent} from "./rodo/rodo.component";

const APP_ROUTES: Route[] = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'information', component: RodoComponent},
  {path: 'resetpassword', component: ResetpasswordComponent},
  {path: 'user/management', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'myaccount', component: MyaccountComponent, canActivate: [AuthGuard]},
  {path: 'level', component: LevelListComponent, canActivate: [AuthGuard]},
  {path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: 'technique', component: TechniqueComponent, canActivate: [AuthGuard]},
  {path: 'mental', component: MentalComponent, canActivate: [AuthGuard]},
  {path: 'fitness', component: FitnessComponent, canActivate: [AuthGuard]},
  {path: 'routine', component: BasicroutineComponent, canActivate: [AuthGuard]},
  {path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard]},
  {path: 'stripe-checkout/purchaseResultCancel', component: CancelComponent, canActivate: [AuthGuard]},
  {path: 'stripe-checkout/purchaseResultSuccess', component: SuccessComponent, canActivate: [AuthGuard]},
  {path: 'statute', component: StatuteComponent, canActivate: [AuthGuard]},
  {path: 'policy', component: PolicyComponent, canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
  {path: '', pathMatch: 'full', redirectTo: ''}

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
