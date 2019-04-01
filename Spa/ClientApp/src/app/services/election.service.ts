import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Election } from 'src/app/models/election';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const API_URL = "https://votingtoolmock.azurewebsites.net/api/bogus/election";

const httpOptions = {
  headers: new HttpHeaders(
  {
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  elections = [];

  constructor(
    private http: HttpClient
  ) { }

  getElections(): Observable<Election[]> {
    return this.http.get<Election[]>(API_URL, httpOptions)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError('getElections', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
