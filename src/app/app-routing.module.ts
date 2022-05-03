import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {FavoriteComponent} from "./exercise/favorite/favorite.component";
import {AuthGuard} from "./auth/auth.guard";
import {LevelListComponent} from "./level/level-list/level-list.component";
import {HomeComponent} from "./home/home/home.component";

const APP_ROUTES: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'level', component: LevelListComponent, canActivate: [AuthGuard]},
  {path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
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
