import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from '../models/character.model';
import { User } from '../../auth/models/user.model';

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

  public setSelected(character: Character): Observable<User> {
    const url = `${environment.apiUrl}auth/character/`;
    return this.http.post<{ user: User }>(url, { selectedCharacter: character.id }, this.options()).pipe(map(v => v.user || null));
  }

  private options(headers?: HttpHeaders) {
    return { withCredentials: true, headers };
  }
}
