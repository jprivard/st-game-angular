import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Participant } from '../models/participant.model';
import { Message } from '../models/message.model';
import { Group } from '../models/group.model';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-mission-messages',
  template: `
  <mat-card>
    <mat-card-title><span>{{ 'MISSION.COMMUNICATIONS' | translate | uppercase }}</span></mat-card-title>
    <mat-card-content>
      <mat-accordion *ngIf="(messages | filter: filters) as filteredMessages">
        <app-mission-message *ngFor="let message of filteredMessages; let i = index"
            [message]="message" [participant]="getPoster(message)" [expanded]="i === step"
            [isFirst]="i === 0" [isLast]="i === filteredMessages.length - 1"
            (reading)="reading(filteredMessages, $event)" (moveStep)="moveStep($event)"
        ></app-mission-message>
        <app-mission-reply [expanded]="step === filteredMessages.length" [groups]="groups"
            (publishMessage)="postMessage($event)" (reading)="reading(filteredMessages, $event)"
        ></app-mission-reply>
    </mat-accordion>
  </mat-card-content>
  </mat-card>
  `,
  styles: [``],
  })
export class MessagesComponent {
  @Input() public participants: Participant[];
  @Input() public messages: Message[];
  @Input() public groups: Group[];
  @Input() public filters;
  @Input() public step: number;
  @Output() public markAsRead = new EventEmitter<Message>();
  @Output() public publishMessage = new EventEmitter<Post>();
  public lastMessage: Message;
  constructor() {}

  public getPoster(message: Message) {
    return this.participants.find(p => p.id === message.character);
  }

  public reading(messages: Message[], message: Message) {
    if (this.lastMessage && this.lastMessage.read === 0) {
      this.markAsRead.emit(this.lastMessage);
    }
    this.step = message ? messages.findIndex(m => m === message) : messages.length;
    this.lastMessage = message;
  }

  public moveStep(direction: number) {
    this.step += direction;
  }

  public postMessage(post: Post) {
    this.publishMessage.emit(post);
  }
}
