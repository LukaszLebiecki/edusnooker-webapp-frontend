import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LevelService} from "./level/level.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ExerciseService} from "./exercise/exercise.service";
import {CoreModule} from "./core-module/core-module";
import {AppRoutingModule} from "./app-routing.module";
import {ProgressService} from "./progress/progress.service";
import {ProgressExerciseComponent} from './progress/progress-exercise/progress-exercise.component';
import {ProgressSharedService} from "./progress/progress-shared.service";
import {LoginModule} from "./login/login.module";
import {AuthGuard} from "./auth/auth.guard";
import {LayoutService} from "./shared-module/services/layout.service";
import {FooterComponent} from './footer/footer.component';
import {LevelRoutingModule} from "./level/level-routing.module";
import {LoginRoutingModule} from "./login/login-routing.module";
import {ExerciseListComponent} from "./exercise/exercise-list/exercise-list.component";
import {CommonModule} from "@angular/common";
import {LevelModule} from "./level/level.module";
import {HomeComponent} from './home/home/home.component';
import {AuthenticationService} from "./auth/authentication.service";
import {UserService} from "./user/user.service";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {NotificationModule} from "./notification/notification.module";
import {NotificationService} from "./notification/notification.service";
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MyaccountComponent } from './myaccount/myaccount.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ExerciseComponent } from './exercise/exercise/exercise.component';
import { NgChartsModule } from "ng2-charts";
import { StatisticsComponent } from './statistics/statistics.component';
import { TechniqueComponent } from './technique/technique.component';
import { PaymentsComponent } from './payments/payments/payments.component';
import { StatuteComponent } from './statute/statute/statute.component';
import { PolicyComponent } from './policy/policy/policy.component';
import { ContactComponent } from './contact/contact/contact.component';
import {FavoriteComponent} from "./exercise/favorite/favorite.component";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CancelComponent } from './payments/cancel/cancel.component';
import { SuccessComponent } from './payments/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressExerciseComponent,
    ExerciseListComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    UserComponent,
    MyaccountComponent,
    ResetpasswordComponent,
    ExerciseComponent,
    StatisticsComponent,
    TechniqueComponent,
    PaymentsComponent,
    StatuteComponent,
    PolicyComponent,
    ContactComponent,
    FavoriteComponent,
    LandingPageComponent,
    CancelComponent,
    SuccessComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        CoreModule,
        FormsModule,
        LevelModule,
        LoginModule,
        AppRoutingModule,
        LoginRoutingModule,
        LevelRoutingModule,
        HttpClientModule,
        NotificationModule,
        NgChartsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
    ],
  providers: [
    LevelService,
    ExerciseService,
    ProgressService,
    ProgressSharedService,
    AuthGuard,
    LayoutService,
    AuthenticationService,
    UserService,
    NotificationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  exports: [
    ProgressExerciseComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
