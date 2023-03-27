import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Schedule} from "../models/schedule";
import {Cinema} from "../models/cinema";

@Injectable({
  providedIn: 'root'
})
export class EditModalService {
  public schedule = new Subject<Schedule | undefined>();
  public editSchedule = new Subject<Schedule | undefined>();
  public cinema = new Subject<Cinema>();
  public editCinema = new Subject<Cinema | undefined>();

  public setSchedule(schedule: Schedule | undefined) {
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

}
