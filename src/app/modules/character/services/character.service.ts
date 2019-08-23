import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  public list(): Observable<Character[]> {
    const url = `${environment.apiUrl}characters/`;
    return this.http.get<{ characters: Character[] }>(url, this.options()).pipe(map(v => v.characters || null));
  }

  public create(character: Character): Observable<Character[]> {
    const url = `${environment.apiUrl}characters/`;
    return this.http.post<{ character: Character[] }>(url, character, this.options()).pipe(map(v => v.character || null));
  }

  private options(headers?: HttpHeaders) {
    return { withCredentials: true, headers };
  }
}
