import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ExerciseListComponent} from "../exercise/exercise-list/exercise-list.component";


const LEVEL_ROUTES: Route[] = [
  {path: 'level/:id', component: ExerciseListComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(LEVEL_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class LevelRoutingModule {}
