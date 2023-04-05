import {Component, Input, OnInit} from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {Actor} from "../../../models/actor";
import {Genre} from "../../../models/genre";
import {Film} from "../../../models/film";
import {FilmService} from "../../../service/http/film.service";

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit{
  showModal?: boolean;
  @Input() actors?: Actor[]
  @Input() genres?: Genre[]
  film: Film = {id: "", name: "", budget: 0, dateExits: new Date(), actors: [], genres: []}

  today: string = ""
  constructor(
    private filmService: FilmService,
    private readonly showModalService: ShowModalService
  ) {}

  ngOnInit(): void {
    this.showModalService.showModal$.subscribe((showModal) => this.showModal = showModal);
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }

  add(showModal: boolean) {
    if(this.film && this.checkFilm() && this.today){
      this.film.dateExits = new Date(this.today)
      this.filmService.addFilm(this.film).subscribe()
      this.setShowModal(showModal);
      this.film = {id: "", name: "", budget: 0, dateExits: new Date(), actors: [], genres: []};
    }
  }

  checkFilm(): boolean{
    return !!(this.film.budget > 0 && this.film.name && this.film.actors.length && this.film.genres.length);
  }

  selectActor(actor: Actor) {
    if(!this.film.actors.some(a => a.id === actor.id)){
      this.film.actors.push(actor);
    }
    else {
      this.film.actors = this.film.actors.filter(a => a.id != actor.id);
    }
  }

  selectGenre(genre: Genre) {
    if(!this.film.genres.some(g => g.id === genre.id)){
      this.film.genres.push(genre);
    }
    else {
      this.film.genres = this.film.genres.filter(g => g.id != genre.id);
    }
  }
}
