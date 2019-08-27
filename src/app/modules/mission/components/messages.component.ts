import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Participant } from '../models/participant.model';
import { Message } from '../models/message.model';
import { Mission } from '../models/mission.model';

@Component({
  selector: 'app-mission-messages',
  template: `
  <mat-card class="orange">
    <mat-card-title><span>{{ 'MISSION.COMMUNICATIONS' | translate }}</span></mat-card-title>
    <mat-card-content>
      <mat-accordion>
        <mat-expansion-panel *ngFor="let message of messages; let i = index" [expanded] = "step === i" (opened)="setStep(i, message)">
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
            <button mat-button color="warn" [disabled] = "i == 0" (click)="prevStep()">Previous</button>
            <button mat-button color="primary" [disabled] = "(messages.length - 1) == i" (click)="nextStep()">Next</button>
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
  @Input() mission: Mission;
  @Input() participants: Participant[];
  @Input() messages: Message[];
  @Input() step = 0;
  @Output() markAsRead = new EventEmitter<Message>();
  icons = {
    1: 'chrome_reader_mode',
    2: 'person',
    3: 'people_alt'
  };

  constructor() {}

  getCharacter(participants: Participant[], message: Message) {
    return participants.find(p => p.id === message.character);
  }

  prevStep() {
    this.step--;
  }

  nextStep() {
    this.step++;
  }

  setStep(i: number, message: Message) {
    if (message.read === 0) {
      this.markAsRead.emit(message);
    }
    this.step = i;
  }

}
