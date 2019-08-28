import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Participant } from '../models/participant.model';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-mission-message',
  template: `
  <mat-expansion-panel [expanded] = "expanded" (opened) = "reading.emit(message)">
    <mat-expansion-panel-header collapsedHeight="36px" expandedHeight="36px">
    <mat-panel-title class="col-6">
      <mat-icon [ngClass]="{ 'hidden': message.read }">new_releases</mat-icon>
      <mat-icon class="icon">{{ icons[message.type] }}</mat-icon>
      <mat-icon class="icon">account_circle</mat-icon> {{ participant | fullname }}
    </mat-panel-title>
    <mat-panel-description class="col-6">
      <mat-icon class="icon">event</mat-icon> {{ message.creationDate | date: 'dd/MM/yyyy HH:mm:ss' }}
    </mat-panel-description>
    </mat-expansion-panel-header>
     {{ message.message }}
    <mat-action-row>
      <button mat-button color="warn" [disabled]="isFirst" (click)="moveStep.emit(-1)">Previous</button>
      <button mat-button color="primary" (click)="moveStep.emit(1)">{{ isLast ? 'Reply' : 'Next' }}</button>
    </mat-action-row>
  </mat-expansion-panel>
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
export class MessageComponent {
  @Input() message: Message;
  @Input() participant: Participant;
  @Input() expanded: boolean;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
  @Output() moveStep = new EventEmitter<number>();
  @Output() reading = new EventEmitter<Message>();
  /* */ public icons = {
    1: 'chrome_reader_mode',
    2: 'person',
    3: 'people_alt'
  };
  constructor() {}
}
