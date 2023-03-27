import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {FilmComponent} from "./components/film/film.component";
import {FilmsComponent} from "./components/films/films.component";
import {ActorsAndGenresComponent} from "./components/actors-and-genres/actors-and-genres.component";

const routes: Routes = [
  { path: 'films', component: FilmsComponent},
  { path: 'actorsAndGenres', component: ActorsAndGenresComponent},
  { path: 'film/:id', component: FilmComponent},
  { path: 'schedule/:id', component: ScheduleComponent},
  { path: '', component: MainPageComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
