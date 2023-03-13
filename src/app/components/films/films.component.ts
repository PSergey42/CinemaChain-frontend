import { Component } from '@angular/core';
import {Film} from "../../models/film";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent {
  films?: Film[] = [{id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []}]
}
