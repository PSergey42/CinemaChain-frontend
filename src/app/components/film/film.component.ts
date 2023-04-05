import {Component, Input} from '@angular/core';
import {Film} from "../../models/film";
import {ShowModalService} from "../../service/show-modal.service";
import {EditModalService} from "../../service/edit-modal.service";
import {FilmService} from "../../service/http/film.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent {
  film: Film = {id: "", name: "", budget: 0, dateExits: new Date(), actors: [], genres: []}

  today: string = ""

  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private readonly showModalService: ShowModalService,
    private readonly editModalService: EditModalService
  ) {
    this.filmService.film.subscribe(film => this.film = film)
    route.params.subscribe(params => this.film.id = params['id'])
  }

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(): void {
    this.filmService.getFilmById(this.film.id).subscribe();
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
