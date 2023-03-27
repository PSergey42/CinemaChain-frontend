import { Component } from '@angular/core';
import {Actor} from "../../models/actor";
import {Genre} from "../../models/genre";

@Component({
  selector: 'app-actors-and-genres',
  templateUrl: './actors-and-genres.component.html',
  styleUrls: ['./actors-and-genres.component.css']
})
export class ActorsAndGenresComponent {
  actors?: Actor[] = [{id: "", fio: "1"}, {id: "", fio: "1"}, {id: "", fio: "1"}]
  genres?: Genre[] = [{id: "", name: "1"}, {id: "", name: "1"}, {id: "", name: "1"}]
}
