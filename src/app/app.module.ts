import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ExerciseModule} from "./exercise/exercise.module";
import {LevelModule} from "./level/level.module";
import {LevelService} from "./level/level.service";
import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {ExerciseService} from "./exercise/exercise.service";
import {CoreModule} from "./core-module/core-module";
import {AppRoutingModule} from "./app-routing.module";
import {LevelRoutingModule} from "./level/level-routing.module";
import {ProgressService} from "./progress/progress.service";
import { ProgressExerciseComponent } from './progress/progress-exercise/progress-exercise.component';




@NgModule({
  declarations: [
    AppComponent,
    ProgressExerciseComponent

  ],
  imports: [
    BrowserModule,
    LevelModule,
    CoreModule,
    AppRoutingModule,
    LevelRoutingModule
  ],
  providers: [LevelService, ExerciseService, ProgressService],
  exports: [
    ProgressExerciseComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}
