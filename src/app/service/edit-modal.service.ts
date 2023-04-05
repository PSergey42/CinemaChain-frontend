import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Schedule} from "../models/schedule";
import {Cinema} from "../models/cinema";
import {Film} from "../models/film";

@Injectable({
  providedIn: 'root'
})
export class EditModalService {
  public schedule = new Subject<Schedule>();
  public editSchedule = new Subject<Schedule | undefined>();
  public cinema = new Subject<Cinema>();
  public editCinema = new Subject<Cinema | undefined>();
  public film = new Subject<Film>();

  public setSchedule(schedule: Schedule) {
    this.schedule.next(schedule);
  }

  public setEditSchedule(schedule: Schedule | undefined){
    this.editSchedule.next(schedule);
  }

  public setCinema(cinema: Cinema) {
    this.cinema.next(cinema);
  }

  public setEditCinema(cinema: Cinema | undefined){
    this.editCinema.next(cinema);
  }

  public setFilm(film: Film) {
    this.film.next(film);
  }

}
