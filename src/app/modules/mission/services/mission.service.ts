import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mission } from '../models/mission.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Participant } from '../models/participant.model';
import { Message } from '../models/message.model';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor(private http: HttpClient) {}

  public list(): Observable<Mission[]> {
    const url = `${environment.apiUrl}missions/`;
    return this.http.get<{ missions: Mission[] }>(url, this.options()).pipe(map(v => v.missions || null));
  }

  public getParticipants(id: number): Observable<Participant[]> {
    const url = `${environment.apiUrl}mission/${ id }/participants`;
    return this.http.get<{ participants: Participant[] }>(url, this.options()).pipe(map(v => v.participants || null));
  }

  public getMessages(id: number): Observable<Message[]> {
    const url = `${environment.apiUrl}mission/${ id }/messages`;
    return this.http.get<{ messages: Message[] }>(url, this.options()).pipe(map(v => v.messages || null));
  }

  public getGroups(id: number): Observable<Group[]> {
    const url = `${environment.apiUrl}mission/${ id }/groups`;
    return this.http.get<{ groups: Group[] }>(url, this.options()).pipe(map(v => v.groups || null));
  }

  public markAsRead(mission: number, message: number): Observable<string> {
    const url = `${environment.apiUrl}mission/${ mission }/message/${ message }/read`;
    return this.http.get<{ message: string }>(url, this.options()).pipe(map(v => v.message || null));
  }

  private options(headers?: HttpHeaders) {
    return { withCredentials: true, headers };
  }
}
