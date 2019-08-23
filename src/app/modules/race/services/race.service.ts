import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Race } from '../models/race.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  constructor(private http: HttpClient) {}

  public list(): Observable<Race[]> {
    const url = `${environment.apiUrl}races/`;
    return this.http.get<{ races: Race[] }>(url, this.options()).pipe(map(v => v.races || null));
  }

  private options(headers?: HttpHeaders) {
    return { withCredentials: true, headers };
  }
}
