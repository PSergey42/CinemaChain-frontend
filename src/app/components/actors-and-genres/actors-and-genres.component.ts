import { Component } from '@angular/core';
import {Actor} from "../../models/actor";
import {Genre} from "../../models/genre";

@Component({
  selector: 'app-actors-and-genres',
  templateUrl: './actors-and-genres.component.html',
  styleUrls: ['./actors-and-genres.component.css']
})
export class ActorsAndGenresComponent {
  actors: Actor[] = [{id: "1", fio: "1"}, {id: "2", fio: "1"}, {id: "3", fio: "1"}]
  genres: Genre[] = [{id: "1", name: "1"}, {id: "2", name: "1"}, {id: "3", name: "1"}]

  addActor(){
    this.actors.push({id: "", fio: ""});
  }

  addGenre(){
    this.genres.push({id: "", name: ""});
  }
}


