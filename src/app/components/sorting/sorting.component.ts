import {Component, Input} from '@angular/core';
import {Actor} from "../../models/actor";
import {Genre} from "../../models/genre";

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent {
  @Input() actors?: Actor[]
  @Input() genres?: Genre[]
}
