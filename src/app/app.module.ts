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
import { EditFilmScheduleComponent } from './components/modal/edit-film-schedule/edit-film-schedule.component';
import { EditSessionComponent } from './components/modal/edit-film-schedule/edit-session/edit-session.component';
import { EditCinemaComponent } from './components/modal/edit-cinema/edit-cinema.component';
import { ActorsAndGenresComponent } from './components/actors-and-genres/actors-and-genres.component';
import { ActorInFilmComponent } from './components/film/actor-in-film/actor-in-film.component';
import { GenreInFilmComponent } from './components/film/genre-in-film/genre-in-film.component';
import { EditFilmComponent } from './components/modal/edit-film/edit-film.component';

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
    AddFilmScheduleComponent,
    EditFilmScheduleComponent,
    EditSessionComponent,
    EditCinemaComponent,
    ActorsAndGenresComponent,
    ActorInFilmComponent,
    GenreInFilmComponent,
    EditFilmComponent
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
