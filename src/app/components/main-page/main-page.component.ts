import {Component, Input} from '@angular/core';
import {Cinema} from "../../models/cinema";
import {ShowModalService} from "../../service/show-modal.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  cinemas: Cinema[] = [{id: "1", address: "ул. Аврора", name: "Киномакс"},
    {id: "2", address: "ул. Гагарина", name: "Мягкий кинотеатр"}
  ] //запрос

  showModal = false;

  constructor(
    private readonly showModalService: ShowModalService
  ) {}

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }

}
