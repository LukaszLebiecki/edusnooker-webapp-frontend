import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExerciseListComponent} from './exercise-list/exercise-list.component';
import {SharedModule} from "../shared-module/shared-module";
import { FavoriteComponent } from './favorite/favorite.component';
import {AppModule} from "../app.module";
import {ProgressSharedService} from "../progress/progress-shared.service";


@NgModule({
  declarations: [
    ExerciseListComponent,
    FavoriteComponent
  ],
  exports: [
    ExerciseListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppModule
  ],

})
export class ExerciseModule {
}
