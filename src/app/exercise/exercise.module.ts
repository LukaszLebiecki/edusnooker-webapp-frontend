import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared-module/shared-module";
import {AppModule} from "../app.module";
import {FavoriteComponent} from "./favorite/favorite.component";


@NgModule({
  declarations: [
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    AppModule,
  ],

})
export class ExerciseModule {
}
