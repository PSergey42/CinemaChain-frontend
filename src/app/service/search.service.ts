import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Genre} from "../models/genre";
import {Actor} from "../models/actor";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchGenres = new Subject<Genre[]>()

  public searchActors = new Subject<Actor[]>()

  public setSearchGenres(searchGenres: Genre[]){
    this.searchGenres.next(searchGenres);
  }

  public setSearchActors(searchActors: Actor[]){
    this.searchActors.next(searchActors);
  }

}
