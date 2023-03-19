import { Component } from '@angular/core';
import {Film} from "../../models/film";
import {ShowModalService} from "../../service/show-modal.service";
import {Actor} from "../../models/actor";
import {Genre} from "../../models/genre";

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

  actors?: Actor[] = [{id: "12", fio: "Илья"}, {id: "12", fio: "Илья2"}, {id: "12", fio: "Илья3"}, {id: "12", fio: "Илья2"}, {id: "12", fio: "Илья2"}, {id: "12", fio: "Илья2"}, {id: "12", fio: "Илья2"}]//из запроса
  genres?: Genre[] //из запроса
  showModal = false;

  constructor(
    private readonly showModalService: ShowModalService
  ) {}

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }
}
