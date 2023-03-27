import {Session} from "./session";

export interface Schedule{
  id?: string,
  filmId?: string,
  cinemaId?: string,
  sessions?: Session[]
}
