import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Session} from "../../../../models/session";

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent{
  @Input() session: Session = {id: 0, showDate: new Date(), showTime: undefined, hall: 0, numberSeats: 0}
  @Output() delete = new EventEmitter<number>();
}
