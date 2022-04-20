import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ExerciseModule} from "./exercise/exercise.module";
import {LevelModule} from "./level/level.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ExerciseModule,
    LevelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
