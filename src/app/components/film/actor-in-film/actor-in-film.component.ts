import {Component, Input} from '@angular/core';
import {Actor} from "../../../models/actor";

@Component({
  selector: 'app-actor-in-film',
  templateUrl: './actor-in-film.component.html',
  styleUrls: ['./actor-in-film.component.css']
})
export class ActorInFilmComponent {
  @Input() actor: Actor = {id: "", fio: ""}

}
