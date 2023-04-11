import {Component, OnInit} from '@angular/core';
import {Film} from "../../models/film";
import {Schedule} from "../../models/schedule";
import {ShowModalService} from "../../service/show-modal.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ScheduleService} from "../../service/http/schedule.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{
  schedules: Schedule[] = []
  cinemaId: string = "";
  showModal = false;
  search: string = ""
  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private readonly showModalService: ShowModalService
  ) {
    this.cinemaId = route.snapshot.paramMap.get('id')!
    this.scheduleService.schedules.subscribe(schedules => this.schedules = schedules)
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }

  today = '2001-09-23';

  ngOnInit() {
    this.getListFilmByDate(this.cinemaId, this.today);
  }

  getListFilmByDate(cinema_id: string, date: string): void{
    this.scheduleService.getSchedules(cinema_id, date).subscribe()
  }

  searchSchedule() {
    if(this.search){
      this.scheduleService.searchSchedule(this.cinemaId, this.search, this.today).subscribe();
      this.search = "";
    }
    else {
      this.scheduleService.getSchedules(this.cinemaId, this.today).subscribe();
    }
  }
}

