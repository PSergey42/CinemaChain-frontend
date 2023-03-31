import {Component, OnInit, Input} from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {Film} from "../../../models/film";
import {Session} from "../../../models/session";

@Component({
  selector: 'app-add-film-schedule',
  templateUrl: './add-film-schedule.component.html',
  styleUrls: ['./add-film-schedule.component.css']
})
export class AddFilmScheduleComponent implements OnInit{

  @Input() today?: string;

  films: Film[] = [{id: "31", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "32", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "34", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []},
    {id: "35", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []}]

  schedule: Session[] = [];
  showModal?: boolean;

  constructor(
    private readonly showModalService: ShowModalService
  ) {}

  ngOnInit(): void {
    this.showModalService.showModal$.subscribe((showModal) => this.showModal = showModal);
  }

  public setShowModal(showModal: boolean): void {
      this.selectedFilm("");
      this.schedule = [];
      this.showModalService.setShowModal(showModal);
  }

  addSessionFilm() {
    if(this.isCheckbox){
      this.schedule?.push({showDate: new Date(this.today as string), showTime: undefined, hall: undefined, numberSeats: undefined})
    }
  }

  checkSessions(): boolean {
    if(this.schedule.length == 0){
      document?.getElementById("add")?.setAttribute("disabled", "disabled");
      return true;
    }
    for(let s of this.schedule){
        if(!(s.hall && s.numberSeats && s.showTime)) {
          document?.getElementById("add")?.setAttribute("disabled", "disabled");
          return true;
        }
    }

    document?.getElementById("add")?.removeAttribute("disabled");
    return true;
  }
  isCheckbox = false;
  selectedFilm(id: string) {
    if(!this.isCheckbox){
      for (let f of this.films){
        if(f.id != id) document?.getElementById(f.id)?.setAttribute("disabled", "disabled");
      }
      this.isCheckbox = true;
    } else {
      for (let f of this.films){
        document?.getElementById(f.id)?.removeAttribute("disabled");
      }
      this.isCheckbox = false;
    }
  }
}
