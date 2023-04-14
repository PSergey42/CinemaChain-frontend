import { Component } from '@angular/core';
import {Film} from "../../models/film";
import {ShowModalService} from "../../service/show-modal.service";
import {Actor} from "../../models/actor";
import {Genre} from "../../models/genre";
import {FilmService} from "../../service/http/film.service";
import {GenreService} from "../../service/http/genre.service";
import {ActorService} from "../../service/http/actor.service";
import {SearchService} from "../../service/search.service";
import {Budget} from "../../models/budget";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent {
  films: Film[] = []
  actors: Actor[] = []
  genres: Genre[] = []
  showModal = false;
  search: string = ""

  searchGenres: Genre[] = []

  searchActors: Actor[] = []

  budget: Budget = {leftBorder: 0, rightBorder: 0}

  constructor(
    private genreService: GenreService,
    private actorService: ActorService,
    private filmService: FilmService,
    private searchService: SearchService,
    private readonly showModalService: ShowModalService
  ) {
    this.filmService.films.subscribe(films => this.films = films);
    this.searchService.searchActors.subscribe(searchActors => this.searchActors = searchActors)
    this.searchService.searchGenres.subscribe(searchGenres => this.searchGenres = searchGenres)
  }

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(): void {
    this.filmService.getFilms().subscribe(films => this.films = films);
    this.genreService.getGenres().subscribe(genres => this.genres = genres);
    this.actorService.getActors().subscribe(actors => this.actors = actors);
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }

  deleteFilm(id: string) {
    this.filmService.deleteFilm(id).subscribe();
  }

  searchFilm() {
    this.filmService.searchFilms(this.search, this.budget, this.searchActors, this.searchGenres).subscribe();
  }
}
