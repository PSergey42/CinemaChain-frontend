import {Component, OnInit, Input} from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {Film} from "../../../models/film";

@Component({
  selector: 'app-add-film-schedule',
  templateUrl: './add-film-schedule.component.html',
  styleUrls: ['./add-film-schedule.component.css']
})
export class AddFilmScheduleComponent implements OnInit{

  @Input() today?: string;

  films?: Film[] = [{id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []}]
  showModal?: boolean;
  constructor(
    private readonly showModalService: ShowModalService
  ) {}

  ngOnInit(): void {
    this.showModalService.showModal$.subscribe((showModal) => this.showModal = showModal);
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }
}
