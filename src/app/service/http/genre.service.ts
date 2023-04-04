import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Genre} from "../../models/genre";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private url = "http://localhost:8080/api/genre";

  public genres = new BehaviorSubject<Genre[]>([]);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  public setGenres(actor: Genre) {
    this.genres.getValue().push(actor)
    this.genres.next(this.genres.getValue());
  }

  getGenres(): Observable<Genre[]>{
    return this.http.get<Genre[]>(this.url)
      .pipe(
        tap(genres => this.genres.next(genres)),
        catchError(this.handleError<Genre[]>('getGenres', []))
      );
  }

  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.url, genre, this.httpOptions).pipe(
      tap((newGenre: Genre) => this.setGenres(newGenre)),
      catchError(this.handleError<Genre>('addGenre'))
    );
  }

  deleteGenre(id: string): Observable<Genre> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Genre>(url, this.httpOptions).pipe(
      tap(_ => this.genres.next(this.genres.getValue().filter(genre => genre.id !== id))),
      catchError(this.handleError<Genre>('deleteGenre'))
    );
  }

  updateGenre(genre: Genre): Observable<any> {
    return this.http.put(this.url, genre, this.httpOptions).pipe(
      tap(_ => console.log(`updated genre id=${genre.id}`)),
      catchError(this.handleError<any>('updateGenre'))
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
