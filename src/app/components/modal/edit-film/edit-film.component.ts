import {Component, Input} from '@angular/core';
import {Actor} from "../../../models/actor";
import {Genre} from "../../../models/genre";
import {ShowModalService} from "../../../service/show-modal.service";
import {Film} from "../../../models/film";
import {EditModalService} from "../../../service/edit-modal.service";
import {GenreService} from "../../../service/http/genre.service";
import {ActorService} from "../../../service/http/actor.service";
import {FilmService} from "../../../service/http/film.service";

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent {
  showModal?: boolean;
  today: string = "";
  film: Film = {id: "", budget: 0, name: "", dateExits: new Date(), actors: [], genres: []}
  actors: Actor[] = []
  genres: Genre[] = []

  constructor(
    private genreService: GenreService,
    private actorService: ActorService,
    private filmService: FilmService,
    private readonly showModalService: ShowModalService,
    private readonly editModalService: EditModalService
  ) {
    this.editModalService.film.subscribe((film) => {
      this.film = film
      this.today = this.parseDate(new Date(this.film.dateExits).toLocaleDateString())
    });
    this.showModalService.showModal$.subscribe((showModal) => this.showModal = showModal);
  }

  ngOnInit(): void {
    this.genreService.getGenres().subscribe(genres => this.genres = genres);
    this.actorService.getActors().subscribe(actors => this.actors = actors);
  }

  parseDate(s: string): string{
    return s.replaceAll(".", "-").split('-').reverse().join("-")
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }

  public saveEditFilm(showModal: boolean) {
    if(this.checkFilm() && this.today){
      this.showModalService.setShowModal(showModal);
      this.film.dateExits = new Date(this.today)
      this.filmService.updateFilm(this.film).subscribe()
    }
  }

  checkFilm(): boolean{
    return !!(this.film.budget > 0 && this.film.name && this.film.actors.length && this.film.genres.length);
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
    console.log(this.film)
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
