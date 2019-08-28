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
        <app-mission-message *ngFor="let message of filteredMessages; let i = index"
            [message]="message" [participant]="getPoster(message)" [expanded]="i === step"
            [isFirst]="i === 0" [isLast]="i === filteredMessages.length - 1"
            (reading)="reading($event)" (moveStep)="moveStep($event)"
        ></app-mission-message>
        <app-mission-reply [expanded]="step === filteredMessages.length"
            (reading)="reading($event)"
        ></app-mission-reply>
    </mat-accordion>
  </mat-card-content>
  </mat-card>
  `,
  styles: [``],
  })
export class MessagesComponent {
  @Input() public participants: Participant[];
  @Input() set messages(messages: Message[]) { this.filterMessages(messages, this._filters); }
  @Input() set filters( filters) { this.filterMessages(this._messages, filters); }
  @Input() public step: number;
  @Output() public markAsRead = new EventEmitter<Message>();
  public lastMessage: Message;
  public filteredMessages: Message[] = [];
  private _messages: Message[];
  private _filters: string[];

  constructor() {}

  public filterMessages(messages: Message[], filters: string[]) {
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

  getPoster(message: Message) {
    return this.participants.find(p => p.id === message.character);
  }

  reading(message: Message) {
    if (this.lastMessage && this.lastMessage.read === 0) {
      this.markAsRead.emit(this.lastMessage);
    }
    this.step = message ? this.filteredMessages.findIndex(m => m === message) : this.filterMessages.length;
    this.lastMessage = message;
  }

  moveStep(direction: number) {
    this.step += direction;
  }
}
