import {Component, Input} from '@angular/core';
import {Genre} from "../../models/genre";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent {
  @Input() genre?: Genre
}
