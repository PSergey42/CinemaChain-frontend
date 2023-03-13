import { Component } from '@angular/core';
import {Film} from "../../models/film";
import {Schedule} from "../../models/schedule";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  schedules: Schedule[] = [{id: "1", filmId: "уауауа", cinemaId: "ffwfw", sessions: [{showDate: new Date(), showTime: {hours: 10, minutes: 15}, hall: 6, numberSeats: 20},
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
}

