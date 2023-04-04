import { Component } from '@angular/core';
import {Actor} from "../../models/actor";
import {Genre} from "../../models/genre";
import {CinemaService} from "../../service/http/cinema.service";
import {ShowModalService} from "../../service/show-modal.service";
import {GenreService} from "../../service/http/genre.service";
import {ActorService} from "../../service/http/actor.service";

@Component({
  selector: 'app-actors-and-genres',
  templateUrl: './actors-and-genres.component.html',
  styleUrls: ['./actors-and-genres.component.css']
})
export class ActorsAndGenresComponent {
  actors: Actor[] = []
  genres: Genre[] = []

  constructor(
    private genreService: GenreService,
    private actorService: ActorService,
  ) {
    this.genreService.genres.subscribe(genres => this.genres = genres);
    this.actorService.actors.subscribe(actors => this.actors = actors)
  }

  ngOnInit(): void {
    this.getActorsAndGenres();
  }

  getActorsAndGenres(): void {
    this.genreService.getGenres().subscribe(genres => this.genres = genres);
    this.actorService.getActors().subscribe(actors => this.actors = actors);
  }

  addActor(){
    if(!this.checkActors())
      this.actorService.addActor({id: "", fio: ""}).subscribe();
  }

  addGenre(){
    if(!this.checkGenres())
      this.genreService.addGenre({id: "", name: ""}).subscribe();
  }

  checkActors(): boolean{
    return this.actors.some(a => a.fio === "")
  }

  checkGenres(): boolean{
    return this.genres.some(g => g.name === "")
  }
}


