import {Component, Input} from '@angular/core';
import {Schedule} from "../../models/schedule";
import {Film} from "../../models/film";
import {ShowModalService} from "../../service/show-modal.service";
import {EditModalService} from "../../service/edit-modal.service";

@Component({
  selector: 'app-film-schedule',
  templateUrl: './film-schedule.component.html',
  styleUrls: ['./film-schedule.component.css']
})
export class FilmScheduleComponent {
  @Input() schedule?: Schedule;
  @Input() today?: string;
  film?: Film = {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [], genres: []}; //из запроса по filmId

  showModalEdit?: boolean;
  constructor(
    private readonly editModalService: EditModalService,
    private readonly showModalService: ShowModalService
  ) {
    this.editModalService.editSchedule.subscribe((schedule) => {
    if(schedule && this.schedule?.id == schedule?.id){
      this.schedule = schedule;
    }
  })}

  ngOnInit(): void {
  }

  public setShowModalEdit(showModalEdit: boolean): void {
    this.editModalService.setSchedule(this.cloneSchedule(this.schedule));
    this.showModalService.setShowModalEdit(showModalEdit);
  }

  private cloneSchedule(schedule: Schedule | undefined): Schedule{
    let s = JSON.stringify(schedule)
    return JSON.parse(s)
  }

}
