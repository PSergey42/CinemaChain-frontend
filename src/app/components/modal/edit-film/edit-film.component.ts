import {Component, Input} from '@angular/core';
import {Actor} from "../../../models/actor";
import {Genre} from "../../../models/genre";
import {ShowModalService} from "../../../service/show-modal.service";
import {Film} from "../../../models/film";
import {EditModalService} from "../../../service/edit-modal.service";

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent {
  showModal?: boolean;

  today: string = "";
  @Input() film: Film = {id: "", budget: 0, name: "", dateExits: new Date(), actors: [], genres: []}
  actors: Actor[] = [] //из запроса
  genres: Genre[] = [] //из запроса

  constructor(
    private readonly showModalService: ShowModalService,
    private readonly editModalService: EditModalService
  ) {}

  ngOnInit(): void {
    /*this.film.actors.forEach(x => this.actors.push(x));
    this.film.genres.forEach(x => this.genres.push(x));*/
    this.showModalService.showModal$.subscribe((showModal) => this.showModal = showModal);
    this.editModalService.film.subscribe((film) => this.film = film);
    this.today = this.parseDate(this.film.dateExits.toLocaleDateString());
  }

  parseDate(s: string): string{
    return s.replaceAll(".", "-").split('-').reverse().join("-")
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }

  public saveEditFilm(showModal: boolean) {
    this.showModalService.setShowModal(showModal);
    this.film.dateExits = new Date(this.today)
    this.editModalService.setEditFilm(this.film)
  }

  public cancelEditFilm(showModal: boolean) {
    this.showModalService.setShowModal(showModal);
  }

  onChangeActors(actor: Actor) {
    if(this.film.actors.some(x => x.id === actor.id)){
      this.film.actors = this.film.actors.filter(x => x.id != actor.id);
    }
    else {
      this.film.actors.push(actor);
    }
  }

  onChangeGenres(genre: Genre) {
    if(this.film.genres.some(x => x.id === genre.id)){
      this.film.genres = this.film.genres.filter(x => x.id != genre.id);
    }
    else {
      this.film.genres.push(genre);
    }
  }

  isCheckedActors(id: string) {
    return this.film.actors.some(x => x.id === id);
  }

  isCheckedGenres(id: string) {
    return this.film.genres.some(x => x.id === id);
  }
}
