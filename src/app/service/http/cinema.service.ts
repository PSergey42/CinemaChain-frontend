import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Cinema} from "../../models/cinema";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private url = "http://localhost:8080/api/cinema";

  public cinema = new BehaviorSubject<Cinema[]>([]);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient) { }

  public setCinema(cinema: Cinema) {
    this.cinema.getValue().push(cinema)
    this.cinema.next(this.cinema.getValue());
  }

  getCinema(): Observable<Cinema[]>{
    return this.http.get<Cinema[]>(this.url)
      .pipe(
        tap(cinemas => this.cinema.next(cinemas)),
        catchError(this.handleError<Cinema[]>('getCinemas', []))
      );
  }

  searchCinema(name: string): Observable<Cinema[]> {
    if(!name) {
      return this.getCinema()
    }
    else {
      const url = `${this.url}/search/${name}`;
      return this.http.get<Cinema[]>(url)
        .pipe(
          tap(cinemas => this.cinema.next(cinemas)),
          catchError(this.handleError<Cinema[]>('getCinemas', []))
        );
    }
  }

  addCinema(cinema: Cinema): Observable<Cinema> {
    return this.http.post<Cinema>(this.url, cinema, this.httpOptions).pipe(
      tap((newCinema: Cinema) => this.setCinema(newCinema)),
      catchError(this.handleError<Cinema>('addCinema'))
    );
  }

  deleteCinema(id: string): Observable<Cinema> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Cinema>(url, this.httpOptions).pipe(
      tap(_ => this.cinema.next(this.cinema.getValue().filter(cinema => cinema.id !== id))),
      catchError(this.handleError<Cinema>('deleteCinema'))
    );
  }

  updateCinema(cinema: Cinema): Observable<any> {
    return this.http.put(this.url, cinema, this.httpOptions).pipe(
      tap(_ => console.log(`updated cinema id=${cinema.id}`)),
      catchError(this.handleError<any>('updateCinema'))
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
