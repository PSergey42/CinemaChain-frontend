import {Component, Input} from '@angular/core';
import {Genre} from "../../../models/genre";

@Component({
  selector: 'app-genre-in-film',
  templateUrl: './genre-in-film.component.html',
  styleUrls: ['./genre-in-film.component.css']
})
export class GenreInFilmComponent {
  @Input() genre: Genre = {id: "", name: ""}

}
