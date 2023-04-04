import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Film} from "../../models/film";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private url = "http://localhost:8080/api/film";

  public films = new BehaviorSubject<Film[]>([]);

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

  updateFilm(film: Film): Observable<any> {
    return this.http.put(this.url, film, this.httpOptions).pipe(
      tap(_ => console.log(`updated film id=${film.id}`)),
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
