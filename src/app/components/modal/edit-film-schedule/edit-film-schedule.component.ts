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
  schedule?: Schedule = {id:"", cinemaId:"", filmId:"", sessions: [{showDate: new Date(), showTime:{hours: 0, minutes:0}, hall: 0, numberSeats: 0}]};

  @Input() today?: string;
  showModalEdit?: boolean;
  constructor(
    private readonly editModalService: EditModalService,
    private readonly showModalService: ShowModalService
  ) {
    this.showModalService.showModalEdit$.subscribe((showModalEdit) => this.showModalEdit = showModalEdit);
    this.editModalService.schedule.subscribe( (schedule) => this.schedule = schedule); // не успевает сработать и выполняется ngOnInit
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
