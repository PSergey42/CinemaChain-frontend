import {Component, Input} from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {Schedule} from "../../../models/schedule";
import {Time} from "@angular/common";
import {EditModalService} from "../../../service/edit-modal.service";
import {ScheduleService} from "../../../service/http/schedule.service";

@Component({
  selector: 'app-edit-film-schedule',
  templateUrl: './edit-film-schedule.component.html',
  styleUrls: ['./edit-film-schedule.component.css']
})
//TODO добавить возможность редактировать дату
export class EditFilmScheduleComponent{
  schedule: Schedule = {id:"", cinemaId:"", filmId:"", sessions: [{showDate: new Date(), showTime: undefined, hall: 0, numberSeats: 0}]};

  today: string = "";
  showModalEdit?: boolean;

  constructor(
    private scheduleService: ScheduleService,
    private readonly editModalService: EditModalService,
    private readonly showModalService: ShowModalService
  ) {
    this.showModalService.showModalEdit$.subscribe((showModalEdit) => this.showModalEdit = showModalEdit);
    this.editModalService.schedule.subscribe( (schedule) => {
      this.schedule = schedule
      if(this.schedule && this.schedule.sessions[0] && this.schedule.sessions[0].showDate)
        this.today = this.parseDate(new Date(this.schedule.sessions[0].showDate).toLocaleDateString());
    });
  }

  parseDate(s: string): string{
    return s.replaceAll(".", "-").split('-').reverse().join("-")
  }

  ngOnInit(): void {

  }

  public saveEditFilmSchedule(showModalEdit: boolean) {
    this.scheduleService.updateSchedule(this.cloneSchedule(this.schedule)).subscribe();
    this.showModalService.setShowModalEdit(showModalEdit);
    this.editModalService.setEditSchedule(this.schedule)
  }

  private cloneSchedule(schedule: Schedule | undefined): Schedule{
    let s = JSON.stringify(schedule)
    return JSON.parse(s)
  }

  public cancelEditFilmSchedule(showModalEdit: boolean) {
    this.showModalService.setShowModalEdit(showModalEdit);
  }

  addSessionFilm() {
    if(!this.checkSession()){
      this.schedule.sessions.push({showDate: new Date(this.today as string), showTime: undefined, hall: 0, numberSeats: 0})
    }
  }

  checkSession(): boolean{
    return this.schedule.sessions.some(s => !s.showTime || s.hall < 0 || s.numberSeats < 0);
  }
}
