import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, Subject, tap} from "rxjs";
import {Schedule} from "../../models/schedule";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private url = "http://localhost:8080/api/schedule";

  public schedules = new BehaviorSubject<Schedule[]>([]);

  public schedule = new Subject<Schedule>();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  public setSchedules(schedule: Schedule) {
    schedule.sessions.map(s => {
      if(s.showTime)
        s.showTime = s.showTime.substring(0,5)
    })
    this.schedules.getValue().push(schedule)
    this.schedules.next(this.schedules.getValue());
  }

  getSchedules(cinema_id: string, date: string): Observable<Schedule[]>{
    const url = `${this.url}/${cinema_id}`;
    const params = new HttpParams()
      .append('date', date)
    return this.http.get<Schedule[]>(url, {params})
      .pipe(
        tap(schedules => {
          schedules.map(schedule => schedule.sessions.map(s => {
            if(s.showTime)
              s.showTime = s.showTime.substring(0,5)
          }))
          this.schedules.next(schedules)
        }),
        catchError(this.handleError<Schedule[]>('getSchedules', []))
      );
  }

  addSchedule(schedule: Schedule): Observable<Schedule> {
    schedule.sessions.map(s => s.showTime = s.showTime + ":00")
    return this.http.post<Schedule>(this.url, schedule, this.httpOptions).pipe(
      tap((newSchedule: Schedule) => this.setSchedules(newSchedule)),
      catchError(this.handleError<Schedule>('addSchedule'))
    );
  }

  deleteSchedule(id: string): Observable<Schedule> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Schedule>(url, this.httpOptions).pipe(
      tap(_ => this.schedules.next(this.schedules.getValue().filter(schedule => schedule.id !== id))),
      catchError(this.handleError<Schedule>('deleteSchedule'))
    );
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(this.url, schedule, this.httpOptions).pipe(
      tap(schedule => {
        /*film.dateExits = new Date(film.dateExits)
        this.film.next(film)*/
      }),
      catchError(this.handleError<any>('updateSchedule'))
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
