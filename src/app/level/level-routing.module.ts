import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {ExerciseListComponent} from "../exercise/exercise-list/exercise-list.component";
import {AuthGuard} from "../auth/auth.guard";
import {ExerciseComponent} from "../exercise/exercise/exercise.component";


const LEVEL_ROUTES: Route[] = [
  {path: 'level/:id', component: ExerciseListComponent, canActivate: [AuthGuard]},
  {path: 'level/:id/exercise', component: ExerciseComponent, canActivate: [AuthGuard]},

]

@NgModule({
  imports: [
    RouterModule.forChild(LEVEL_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class LevelRoutingModule {
}
