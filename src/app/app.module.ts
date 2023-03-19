import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CinemaComponent } from './components/cinema/cinema.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FilmComponent } from './components/film/film.component';
import { ActorComponent } from './components/actor/actor.component';
import { SessionComponent } from './components/session/session.component';
import {FilmScheduleComponent} from "./components/film-schedule/film-schedule.component";
import { GenreComponent } from './components/genre/genre.component';
import { FilmsComponent } from './components/films/films.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { AddCinemaComponent } from './components/modal/add-cinema/add-cinema.component';
import { AddFilmComponent } from './components/modal/add-film/add-film.component';
import { AddFilmScheduleComponent } from './components/modal/add-film-schedule/add-film-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    CinemaComponent,
    MainPageComponent,
    FilmComponent,
    ActorComponent,
    SessionComponent,
    FilmScheduleComponent,
    GenreComponent,
    FilmsComponent,
    SortingComponent,
    AddCinemaComponent,
    AddFilmComponent,
    AddFilmScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
