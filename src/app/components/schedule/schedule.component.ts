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
  showModal = false;
  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private readonly showModalService: ShowModalService
  ) {
    this.date = new Date('2001-09-23')
    route.params.subscribe(params => this.getListFilmByDate(params['id'], this.parseDate(this.date.toLocaleDateString())))
    this.scheduleService.schedules.subscribe(schedules => this.schedules = schedules)
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }
  date: Date

  today: string = "";

  ngOnInit() {
    this.today = this.parseDate(this.date.toLocaleDateString());
  }

  parseDate(s: string): string{
    return s.replaceAll(".", "-").split('-').reverse().join("-")
  }

  getListFilmByDate(cinema_id: string, date: string): void{
    //this.date = new Date(date);
    this.scheduleService.getSchedules(cinema_id, date).subscribe()
    //запрос в бд по дате и айди кинотеатра
  }

}

