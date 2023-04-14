import {Component, Input} from '@angular/core';
import {Actor} from "../../models/actor";
import {Genre} from "../../models/genre";
import {SearchService} from "../../service/search.service";
import {Budget} from "../../models/budget";

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent {
  @Input() actors?: Actor[]
  @Input() genres?: Genre[]
  @Input() budget: Budget = {leftBorder: 0, rightBorder: 0}

  searchGenres: Genre[] = []

  searchActors: Actor[] = []

  constructor(
    private searchService: SearchService
  ) {
  }

  searchActor(actor: Actor) {
    if(this.searchActors.find(a => a.id == actor.id)){
      this.searchActors = this.searchActors.filter(a => a.id != actor.id)
    }
    else{
      this.searchActors.push(actor)
    }
    this.searchService.setSearchActors(this.searchActors);
  }

  searchGenre(genre: Genre) {
    if(this.searchGenres.find(g => g.id == genre.id)){
      this.searchGenres = this.searchGenres.filter(g => g.id != genre.id)
    }
    else{
      this.searchGenres.push(genre)
    }
    this.searchService.setSearchGenres(this.searchGenres);
  }
}
