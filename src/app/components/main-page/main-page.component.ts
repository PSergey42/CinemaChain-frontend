import {Component} from '@angular/core';
import {Cinema} from "../../models/cinema";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  cinemas: Cinema[] = [{id: "1", address: "ул. Аврора", name: "Киномакс"},
    {id: "2", address: "ул. Гагарина", name: "Мягкий кинотеатр"}
  ] //запрос
}
