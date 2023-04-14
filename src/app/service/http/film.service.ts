import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, Subject, tap} from "rxjs";
import {Film} from "../../models/film";
import {Budget} from "../../models/budget";
import {Actor} from "../../models/actor";
import {Genre} from "../../models/genre";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private url = "http://localhost:8080/api/film";

  public films = new BehaviorSubject<Film[]>([]);
  public film = new Subject<Film>();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  public setFilms(film: Film) {
    this.films.getValue().push(film)
    this.films.next(this.films.getValue());
  }

  getFilms(): Observable<Film[]>{
    return this.http.get<Film[]>(this.url)
      .pipe(
        tap(films => this.films.next(films)),
        catchError(this.handleError<Film[]>('getFilms', []))
      );
  }

  searchFilms(name: string, budget: Budget, searchActors: Actor[], searchGenres: Genre[]): Observable<Film[]>{
    const url = `http://localhost:8080/api/filmsByParams`;
    let sA = ""
    let sG = ""
    if(!name && budget.leftBorder <= 0 && budget.rightBorder <= 0 && searchActors.length == 0 && searchGenres.length == 0) {
      return this.getFilms()
    }
    let params = new HttpParams()
      .append('name', "")
      .append('budgets', "")
      .append('actors_id', "")
      .append('genres_id', "")
    if(name){
      params = params.set('name', name)
    }
    if(budget.leftBorder > 0 && budget.rightBorder > 0){
      params =  params.set('budgets', budget.leftBorder + "-" + budget.rightBorder)
    }
    if(searchActors.length != 0){
      searchActors.map(a => sA = sA ? sA + "," + a.id : "" + a.id)
      params =  params.set('actors_id', sA)
      console.log(params)
    }
    if(searchGenres.length != 0){
      searchGenres.map(g => sG = sG ? sG + "," + g.id : "" + g.id)
      params =  params.set('genres_id', sG)
    }
    return this.http.get<Film[]>(url, {params})
      .pipe(
        tap(films => this.films.next(films)),
        catchError(this.handleError<Film[]>('searchFilms', []))
      );
  }
  getFilmById(id: string): Observable<Film>{
    const url = `${this.url}/${id}`;
    return this.http.get<Film>(url)
      .pipe(
        tap(film => {
          film.dateExits = new Date(film.dateExits)
          this.film.next(film)
        }),
        catchError(this.handleError<Film>('getFilm'))
      );
  }

  addFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(this.url, film, this.httpOptions).pipe(
      tap((newFilm: Film) => this.setFilms(newFilm)),
      catchError(this.handleError<Film>('addFilm'))
    );
  }

  deleteFilm(id: string): Observable<Film> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Film>(url, this.httpOptions).pipe(
      tap(_ => this.films.next(this.films.getValue().filter(film => film.id !== id))),
      catchError(this.handleError<Film>('deleteFilm'))
    );
  }

  updateFilm(film: Film): Observable<Film> {
    return this.http.put<Film>(this.url, film, this.httpOptions).pipe(
      tap(film => {
        film.dateExits = new Date(film.dateExits)
        this.film.next(film)
      }),
      catchError(this.handleError<any>('updateFilm'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
