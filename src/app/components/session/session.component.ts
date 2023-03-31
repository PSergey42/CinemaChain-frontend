import {Component, Input} from '@angular/core';
import {Session} from "../../models/session";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  @Input() session?: Session;

  isOpen: boolean = false;

}
