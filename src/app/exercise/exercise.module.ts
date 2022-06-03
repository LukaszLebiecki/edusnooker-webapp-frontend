import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared-module/shared-module";
import {FavoriteComponent} from './favorite/favorite.component';
import {AppModule} from "../app.module";


@NgModule({
  declarations: [
    FavoriteComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    AppModule
  ],

})
export class ExerciseModule {
}
