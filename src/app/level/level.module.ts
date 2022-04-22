import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LevelListComponent} from './level-list/level-list.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    LevelListComponent
  ],
  exports: [
    LevelListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,

  ]
})
export class LevelModule {
}
