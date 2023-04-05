import {Component, Input} from '@angular/core';
import {Schedule} from "../../models/schedule";
import {Film} from "../../models/film";
import {ShowModalService} from "../../service/show-modal.service";
import {EditModalService} from "../../service/edit-modal.service";
import {FilmService} from "../../service/http/film.service";
import {ScheduleService} from "../../service/http/schedule.service";

@Component({
  selector: 'app-film-schedule',
  templateUrl: './film-schedule.component.html',
  styleUrls: ['./film-schedule.component.css']
})
export class FilmScheduleComponent {
  @Input() schedule: Schedule = {id: "", cinemaId: "", filmId: "", sessions: []};
  @Input() today: string = "";
  film: Film = {id: "", name: "", budget: 0, dateExits: new Date(), actors: [], genres: []};

  showModalEdit?: boolean;
  constructor(
    private scheduleService: ScheduleService,
    private filmService: FilmService,
    private readonly editModalService: EditModalService,
    private readonly showModalService: ShowModalService
  ) {
    this.editModalService.editSchedule.subscribe((schedule) => {
    if(schedule && this.schedule?.id == schedule?.id){
      this.schedule = schedule;
    }
  })}

  ngOnInit(): void {
    this.filmService.getFilmById(this.schedule.filmId).subscribe(film => this.film = film)
  }

  public setShowModalEdit(showModalEdit: boolean): void {
    this.editModalService.setSchedule(this.cloneSchedule(this.schedule));
    this.showModalService.setShowModalEdit(showModalEdit);
  }

  private cloneSchedule(schedule: Schedule | undefined): Schedule{
    let s = JSON.stringify(schedule)
    return JSON.parse(s)
  }

  delete() {
    this.scheduleService.deleteSchedule(this.schedule.id).subscribe()
  }
}
