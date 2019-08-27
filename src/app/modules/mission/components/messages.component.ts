import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Participant } from '../models/participant.model';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-mission-messages',
  template: `
  <mat-card>
    <mat-card-title><span>{{ 'MISSION.COMMUNICATIONS' | translate | uppercase }}</span></mat-card-title>
    <mat-card-content>
      <mat-accordion>
        <mat-expansion-panel *ngFor="let message of filteredMessages; let i = index"
                             [expanded] = "step === i" (opened)="setStep(i, filteredMessages[i-1])">
          <mat-expansion-panel-header [collapsedHeight]="'30px'" [expandedHeight]="'36px'">
            <mat-panel-title class="col-5">
              <mat-icon [ngClass]="{ 'hidden': message.read }">new_releases</mat-icon>
              <mat-icon class="icon">{{ icons[message.type] }}</mat-icon>
              <mat-icon class="icon">account_circle</mat-icon> {{ getCharacter(participants, message) | fullname }}
            </mat-panel-title>
            <mat-panel-description class="col-6">
              <mat-icon class="icon">event</mat-icon> {{ message.creationDate | date: 'dd/MM/yyyy HH:mm:ss' }}
            </mat-panel-description>
          </mat-expansion-panel-header>
          {{ message.message }}
          <mat-action-row>
            <button mat-button color="warn" [disabled] = "i == 0" (click)="moveStep(-1)">Previous</button>
            <button mat-button color="primary" [hidden] = "(filteredMessages.length - 1) === i" (click)="moveStep(1)">Next</button>
            <button mat-button color="primary" [hidden] = "(filteredMessages.length - 1) !== i" (click)="setStep(i, message)">Mark as read</button>
          </mat-action-row>
        </mat-expansion-panel>
      </mat-accordion>
    </mat-card-content>
  </mat-card>
  `,
  styles: [`
  mat-icon.icon {
    margin-right: 15px;
  }
  mat-icon.hidden {
    opacity: 0;
  }
  `],
  })
export class MessagesComponent {
  @Input() participants: Participant[];
  @Input() set messages(messages: Message[]) { this.filterMessages(messages, this._filters); }
  @Input() set filters( filters) { this.filterMessages(this._messages, filters); }
  @Input() step = 0;
  @Output() markAsRead = new EventEmitter<Message>();
  public filteredMessages: Message[] = [];
  public icons = {
    1: 'chrome_reader_mode',
    2: 'person',
    3: 'people_alt'
  };
  private _messages: Message[];
  private _filters: string[];

  constructor() {}

  getCharacter(participants: Participant[], message: Message) {
    return participants.find(p => p.id === message.character);
  }

  moveStep(direction: number) {
    this.step += direction;
  }

  setStep(i: number, message: Message) {
    if (message && message.read === 0) {
      this.markAsRead.emit(message);
    }
    this.step = i;
  }

  filterMessages(messages: Message[], filters: string[]) {
    if (filters) { console.log(filters.indexOf('new') > -1); }
    this._messages = messages;
    this._filters = filters;
    this.filteredMessages = messages.filter(m => {
      if (filters.indexOf('new') > -1 && m.read === 0) { return m; }
      if (filters.indexOf('story') > -1 && m.type === 1) { return m; }
      if (filters.indexOf('rp') > -1 && m.type === 2) { return m; }
      if (filters.indexOf('hrp') > -1 && m.type === 3) { return m; }
      return;
    });
  }

}
