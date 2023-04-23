import {Component, Input} from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {Schedule} from "../../../models/schedule";
import {Time} from "@angular/common";
import {EditModalService} from "../../../service/edit-modal.service";
import {ScheduleService} from "../../../service/http/schedule.service";
import {Session} from "../../../models/session";

@Component({
  selector: 'app-edit-film-schedule',
  templateUrl: './edit-film-schedule.component.html',
  styleUrls: ['./edit-film-schedule.component.css']
})
export class EditFilmScheduleComponent{
  schedule: Schedule = {id:"", cinemaId:"", filmId:"", sessions: [{showDate: new Date(), showTime: undefined, hall: 0, numberSeats: 0}]};

  today: string = "";
  showModalEdit?: boolean;
  listDelSession: Session[] = []
  date: string = ""
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
        this.date = this.today;
    });
  }

  parseDate(s: string): string{
    return s.replaceAll(".", "-").split('-').reverse().join("-")
  }

  ngOnInit(): void {

  }

  public saveEditFilmSchedule(showModalEdit: boolean) {
    if(this.schedule.sessions.length !== 0){
      this.schedule.sessions.map(x => x.showDate = new Date(this.today))
      this.scheduleService.updateSchedule(this.cloneSchedule(this.schedule), this.date).subscribe();
      this.showModalService.setShowModalEdit(showModalEdit);
      this.editModalService.setEditSchedule(this.schedule)
    }
    if(this.listDelSession.length !== 0){
      console.log(this.listDelSession)
      this.listDelSession.map(s => this.scheduleService.deleteSession(s.id!).subscribe())
    }
    this.listDelSession = []
  }

  private cloneSchedule(schedule: Schedule | undefined): Schedule{
    let s = JSON.stringify(schedule)
    return JSON.parse(s)
  }

  public cancelEditFilmSchedule(showModalEdit: boolean) {
    this.showModalService.setShowModalEdit(showModalEdit);
    this.listDelSession = []
  }

  addSessionFilm() {
    if(!this.checkSession()){
      this.schedule.sessions.push({id: 0, showDate: new Date(this.today as string), showTime: undefined, hall: 0, numberSeats: 0})
    }
  }

  checkSession(): boolean{
    return this.schedule.sessions.some(s => !s.showTime || s.hall < 0 || s.numberSeats < 0);
  }

  delete(id: number){
    if(id == 0){
      if(this.schedule.sessions.length > 1) this.schedule.sessions.pop();
    }
    else{
      this.listDelSession.push(this.schedule.sessions.find(s => s.id == id)!)
      this.schedule.sessions = this.schedule.sessions.filter(s => s.id != id);
    }
  }
}
