import {Component, Input} from '@angular/core';
import {Film} from "../../models/film";
import {ShowModalService} from "../../service/show-modal.service";
import {Cinema} from "../../models/cinema";
import {EditModalService} from "../../service/edit-modal.service";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent {
  film: Film = {id: "33", name: "Илюха возмездие", budget: 10000, dateExits: new Date(), actors: [{id: "12", fio: "Илья"}, {id: "12", fio: "Илья2"}, {id: "12", fio: "Илья3"}],
    genres: [{id: "12", name: "Боевик"}, {id: "12", name: "Боевик"}, {id: "12", name: "Боевик"}, {id: "12", name: "Боевик"}]}; //из запроса

  showModal = false;

  constructor(
    private readonly showModalService: ShowModalService,
    private readonly editModalService: EditModalService
  ) {
    this.editModalService.editFilm.subscribe((film) => {
      if(film && this.film?.id == film?.id){
        this.film = film;
      }
    })
  }

  public setShowModal(showModal: boolean): void {
    this.editModalService.setFilm(this.cloneFilm(this.film));
    this.showModalService.setShowModal(showModal);
  }

  private cloneFilm(film: Film | undefined): Film{
    let s = JSON.stringify(film)
    return JSON.parse(s)
  }
}
