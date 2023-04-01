import {Component, Input} from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {Schedule} from "../../../models/schedule";
import {Time} from "@angular/common";
import {EditModalService} from "../../../service/edit-modal.service";

@Component({
  selector: 'app-edit-film-schedule',
  templateUrl: './edit-film-schedule.component.html',
  styleUrls: ['./edit-film-schedule.component.css']
})
//TODO добавить возможность редактировать дату
export class EditFilmScheduleComponent{
  schedule: Schedule = {id:"", cinemaId:"", filmId:"", sessions: [{showDate: new Date(), showTime:{hours: 0, minutes:0}, hall: 0, numberSeats: 0}]};

  today: string = "";
  showModalEdit?: boolean;

  date: Date = new Date()
  constructor(
    private readonly editModalService: EditModalService,
    private readonly showModalService: ShowModalService
  ) {
    this.showModalService.showModalEdit$.subscribe((showModalEdit) => this.showModalEdit = showModalEdit);
    this.editModalService.schedule.subscribe( (schedule) => this.schedule = schedule); // не успевает сработать и выполняется ngOnInit
    if(this.schedule && this.schedule.sessions && this.schedule.sessions[0].showDate && this.schedule.id){
      this.date = this.schedule.sessions[0].showDate;
      console.log(this.date)
      setTimeout(() => this.today = this.parseDate(this.date.toLocaleDateString()), 100)
    }
  }

  ngOnInit(date: Date): void {
    /*if(this.schedule && this.schedule.sessions && this.schedule.sessions[0].showDate && this.schedule.id){
      date = this.schedule.sessions[0].showDate;
      setTimeout(() => this.today = this.parseDate(date.toLocaleDateString()), 100)
    }*/
  }

  parseDate(s: string | undefined): string{
    if(!s) return "";
    return s.replaceAll(".", "-").split('-').reverse().join("-")
  }

  public saveEditFilmSchedule(showModalEdit: boolean) {
    this.showModalService.setShowModalEdit(showModalEdit);
    this.editModalService.setEditSchedule(this.schedule)
  }

  public cancelEditFilmSchedule(showModalEdit: boolean) {
    this.showModalService.setShowModalEdit(showModalEdit);
  }

  addSessionFilm() {
    this.schedule?.sessions?.push({showDate: new Date(this.today as string), showTime: undefined, hall: undefined, numberSeats: undefined})
  }
}
