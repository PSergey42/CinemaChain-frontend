import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Actor} from "../../models/actor";

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private url = "http://localhost:8080/api/actor";

  public actors = new BehaviorSubject<Actor[]>([]);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  public setActors(actor: Actor) {
    this.actors.getValue().push(actor)
    this.actors.next(this.actors.getValue());
  }

  getActors(): Observable<Actor[]>{
    return this.http.get<Actor[]>(this.url)
      .pipe(
        tap(actors =>this.actors.next(actors)),
        catchError(this.handleError<Actor[]>('getActors', []))
      );
  }

  addActor(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(this.url, actor, this.httpOptions).pipe(
      tap((newActor: Actor) => this.setActors(newActor)),
      catchError(this.handleError<Actor>('addActor'))
    );
  }

  deleteActor(id: string): Observable<Actor> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Actor>(url, this.httpOptions).pipe(
      tap(_ => this.actors.next(this.actors.getValue().filter(actor => actor.id !== id))),
      catchError(this.handleError<Actor>('deleteActor'))
    );
  }

  updateActor(actor: Actor): Observable<any> {
    return this.http.put(this.url, actor, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${actor.id}`)),
      catchError(this.handleError<any>('updateActor'))
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
