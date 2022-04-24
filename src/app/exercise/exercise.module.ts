import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExerciseListComponent} from './exercise-list/exercise-list.component';
import {SharedModule} from "../shared-module/shared-module";
import { FavoriteComponent } from './favorite/favorite.component';


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
    SharedModule
  ]
})
export class ExerciseModule {
}
