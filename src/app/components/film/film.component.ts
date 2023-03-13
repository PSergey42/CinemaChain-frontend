import {Component, Input} from '@angular/core';
import {Film} from "../../models/film";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent {
  film?: Film = {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [{id: "12", fio: "Илья"}, {id: "12", fio: "Илья2"}, {id: "12", fio: "Илья3"}],
    genres: [{id: "12", name: "Боевик"}, {id: "12", name: "Боевик"}, {id: "12", name: "Боевик"}, {id: "12", name: "Боевик"}]}; //из запроса
}
