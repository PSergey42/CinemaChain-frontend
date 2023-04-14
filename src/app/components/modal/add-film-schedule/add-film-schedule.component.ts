import {Component, OnInit, Input} from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {Film} from "../../../models/film";
import {ScheduleService} from "../../../service/http/schedule.service";
import {FilmService} from "../../../service/http/film.service";
import {Schedule} from "../../../models/schedule";
import {ActivatedRoute} from "@angular/router";
import {Time} from "@angular/common";

@Component({
  selector: 'app-add-film-schedule',
  templateUrl: './add-film-schedule.component.html',
  styleUrls: ['./add-film-schedule.component.css']
})
export class AddFilmScheduleComponent implements OnInit{

  @Input() today?: string;

  films: Film[] = []

  schedule: Schedule = {id: "", cinemaId: "", filmId: "", sessions: []}
  showModal?: boolean;

  constructor(
    private scheduleService: ScheduleService,
    private filmService: FilmService,
    private route: ActivatedRoute,
    private readonly showModalService: ShowModalService
  ) {
    this.filmService.films.subscribe(films => this.films = films.filter(f => !this.scheduleService.schedules.getValue().find(s => s.filmId == f.id)))
    this.scheduleService.schedule.subscribe(schedule => this.schedule = schedule)
  }

  ngOnInit(): void {
    this.showModalService.showModal$.subscribe((showModal) => this.showModal = showModal);
  }

  public setShowModal(showModal: boolean): void {
      this.selectedFilm("");
      this.schedule = {id: "", cinemaId: "", filmId: "", sessions: []};
      this.showModalService.setShowModal(showModal);
  }

  addSessionFilm() {
    if(this.isCheckbox && (this.schedule.sessions.length === 0 || this.checkSession())){
      this.schedule.sessions.push({showDate: new Date(this.today as string), showTime: undefined, hall: 0, numberSeats: 0})
    }
  }
  checkSession(): boolean{
    return this.schedule.sessions.some(s => s.showTime && s.hall > 0 && s.numberSeats >= 0);
  }

  checkSessions(): boolean {
    if(this.schedule.sessions.length == 0){
      document?.getElementById("add")?.setAttribute("disabled", "disabled");
      return true;
    }
    for(let s of this.schedule.sessions){
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
      this.schedule.filmId = id;
      this.isCheckbox = true;
    } else {
      for (let f of this.films){
        document?.getElementById(f.id)?.removeAttribute("disabled");
      }
      this.isCheckbox = false;
    }
  }

  add(showModal: boolean) {
    this.schedule.cinemaId = this.route.snapshot.paramMap.get('id')!;
    this.scheduleService.addSchedule(this.schedule).subscribe();
    this.setShowModal(showModal);
  }

}
