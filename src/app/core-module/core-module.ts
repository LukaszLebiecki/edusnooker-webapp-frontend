import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import {AppRoutingModule} from "../app-routing.module";



@NgModule({
  declarations: [
    TopbarComponent
  ],
  exports:[
    TopbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class CoreModule { }
