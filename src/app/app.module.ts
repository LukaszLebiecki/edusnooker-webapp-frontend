import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LevelService} from "./level/level.service";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {ExerciseService} from "./exercise/exercise.service";
import {CoreModule} from "./core-module/core-module";
import {AppRoutingModule} from "./app-routing.module";
import {ProgressService} from "./progress/progress.service";
import {ProgressExerciseComponent} from './progress/progress-exercise/progress-exercise.component';
import {ProgressSharedService} from "./progress/progress-shared.service";
import {LoginModule} from "./login/login.module";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth.guard";
import {LayoutService} from "./shared-module/services/layout.service";
import {FooterComponent} from './footer/footer.component';
import {LevelRoutingModule} from "./level/level-routing.module";
import {LevelModule} from "./level/level.module";
import {LoginRoutingModule} from "./login/login-routing.module";
import {ExerciseListComponent} from "./exercise/exercise-list/exercise-list.component";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    AppComponent,
    ProgressExerciseComponent,
    ExerciseListComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    LoginModule,
    LevelModule,
    AppRoutingModule,
    LevelRoutingModule,
    LoginRoutingModule
  ],
  providers: [LevelService, ExerciseService, ProgressService, ProgressSharedService, AuthService, AuthGuard, LayoutService],
  exports: [
    ProgressExerciseComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}
