import {Component, Input, OnInit} from '@angular/core';
import {Session} from "../../../../models/session";
import {Time} from "@angular/common";

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit{
  @Input() session: Session = {}

  parseTime(t: Time | undefined): string{
    return t?.hours + ":" + t?.minutes
  }

  _time: string = "00:00"

  set time(val: string) {
    this.session.showTime = {hours: parseInt(val.split(":")[0]), minutes: parseInt(val.split(":")[1])}
    this._time = val;
  }

  get time(): string {
    return this._time;
  }

  ngOnInit(): void {
    this.time = this.parseTime(this.session?.showTime)
  }
}
