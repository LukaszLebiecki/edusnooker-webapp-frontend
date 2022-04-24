import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LevelListComponent} from './level-list/level-list.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared-module/shared-module";
import {LevelRoutingModule} from "./level-routing.module";


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
        SharedModule,
        LevelRoutingModule

    ]
})
export class LevelModule {
}
