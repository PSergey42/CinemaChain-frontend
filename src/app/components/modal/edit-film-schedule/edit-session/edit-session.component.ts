import {Component, Input, OnInit} from '@angular/core';
import {Session} from "../../../../models/session";

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent{
  @Input() session: Session = {showDate: new Date(), showTime: undefined, hall: 0, numberSeats: 0}

}
