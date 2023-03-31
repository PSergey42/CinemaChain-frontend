import {Component, OnInit} from '@angular/core';
import {Film} from "../../models/film";
import {Schedule} from "../../models/schedule";
import {ShowModalService} from "../../service/show-modal.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{
  schedules: Schedule[] = [{id: "1", filmId: "уауауа", cinemaId: "ffwfw", sessions: [{showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
      {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
      {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
      {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
      {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
      {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
      {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
      {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
      {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20}]},
    {id: "2", filmId: "уауrа", cinemaId: "ffrtfw", sessions: [{showDate: new Date(), showTime: {hours: 11, minutes: 20}, hall: 6, numberSeats: 20},
        {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
        {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
        {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
        {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
        {showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20}]}]

  showModal = false;
  constructor(private route: ActivatedRoute,
    private readonly showModalService: ShowModalService
  ) {
    this.date = new Date('2001-09-23')
    route.params.subscribe(params => this.getListFilmByDate(params['id'], this.parseDate(this.date.toLocaleDateString()))) // schedules = this.get.....
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }
  date: Date

  today?: string;

  ngOnInit() {
    this.today = this.parseDate(this.date.toLocaleDateString());
  }

  parseDate(s: string): string{
    return s.replaceAll(".", "-").split('-').reverse().join("-")
  }

  getListFilmByDate(cinema_id: string, date: string): void{
    /*this.date = new Date(date);*/
    //запрос в бд по дате и айди кинотеатра
  }

}

