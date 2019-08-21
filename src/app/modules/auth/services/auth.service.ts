import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mapTo, delay, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Credentials } from '../models/credentials.model';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public check(): Observable<User> {
    const url = `${environment.apiUrl}auth/`;
    return this.http.get<{ user: User }>(url, this.options()).pipe(map(v => v.user || null));
  }

  public login(credentials: Credentials): Observable<User> {
    const url = `${environment.apiUrl}auth/login`;
    const body = new URLSearchParams();
    body.set('username', credentials.email);
    body.set('password', credentials.password);
    return this.http.post<{ user: User }>(url, body.toString(), this.options(this.json())).pipe(map(v => v.user || null));
  }

  public logout(): Observable<User> {
    const url = `${environment.apiUrl}auth/logout/`;
    return this.http.get<{ user: User }>(url, this.options()).pipe(map(v => v.user || null));
  }

  private options(headers?: HttpHeaders) {
    return { withCredentials: true, headers };
  }

  private json(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    });
  }
}
