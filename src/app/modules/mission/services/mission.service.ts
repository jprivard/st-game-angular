import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mission } from '../models/mission.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor(private http: HttpClient) {}

  public list(): Observable<Mission[]> {
    const url = `${environment.apiUrl}missions/`;
    return this.http.get<{ missions: Mission[] }>(url, this.options()).pipe(map(v => v.missions || null));
  }

  private options(headers?: HttpHeaders) {
    return { withCredentials: true, headers };
  }
}
