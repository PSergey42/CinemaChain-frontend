import {Genre} from "./genre";
import {Actor} from "./actor";

export interface Film{
  id: string,
  name: string,
  dateExits: Date,
  genres: Genre [],
  actors: Actor [],
  budget: number
}
