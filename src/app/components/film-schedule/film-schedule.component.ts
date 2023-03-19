import {Component, Input} from '@angular/core';
import {Schedule} from "../../models/schedule";
import {Film} from "../../models/film";

@Component({
  selector: 'app-film-schedule',
  templateUrl: './film-schedule.component.html',
  styleUrls: ['./film-schedule.component.css']
})
export class FilmScheduleComponent {
  @Input() schedule?: Schedule;
  film?: Film = {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []}; //из запроса по filmId


}
