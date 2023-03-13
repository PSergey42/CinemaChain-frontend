import {Component, Input} from '@angular/core';
import {Cinema} from "../../models/cinema";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent {
  @Input() cinema?: Cinema;
}
