import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Race } from '../models/race.model';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  constructor(private http: HttpClient) {}

  public list(): Observable<Race[]> {
    return of([]);
    // const url = `${environment.apiUrl}characters/`;
    // return this.http.get<{ characters: Character[] }>(url, this.options()).pipe(map(v => v.characters || null));
  }

  private options(headers?: HttpHeaders) {
    return { withCredentials: true, headers };
  }
}
