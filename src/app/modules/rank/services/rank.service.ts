import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rank } from '../models/rank.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  constructor(private http: HttpClient) {}

  public list(): Observable<Rank[]> {
    const url = `${environment.apiUrl}ranks/`;
    return this.http.get<{ ranks: Rank[] }>(url, this.options()).pipe(map(v => v.ranks || null));
  }

  private options(headers?: HttpHeaders) {
    return { withCredentials: true, headers };
  }
}
