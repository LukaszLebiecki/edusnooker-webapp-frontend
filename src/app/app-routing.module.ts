import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {LevelListComponent} from "./level/level-list/level-list.component";
import {FavoriteComponent} from "./exercise/favorite/favorite.component";

const APP_ROUTES: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'level'},
  {path: 'level', component: LevelListComponent},
  {path: 'favorite', component: FavoriteComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
