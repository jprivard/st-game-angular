import { Component, Input } from '@angular/core';
import { Mission } from '../models/mission.model';
import { Participant } from '../models/participant.model';

@Component({
  selector: 'app-mission-participants',
  template: `
  <mat-card class="grey">
    <mat-card-title>
      <span>
        {{ 'MISSION.PARTICIPANTS' | translate : { number: mission.participants.length } }}
      </span>
    </mat-card-title>
    <mat-card-content>
      <ul>
        <li *ngFor="let participant of participants">
          <div>
            {{ (participant.rank | translate) + ' ' + (participant | fullname) }}
          </div>
          <div class="position">
            <ng-container *ngIf="participant.position">
              {{ participant.position | translate }}
            </ng-container>
            <ng-container *ngIf="participant.ship">
              {{ participant.ship }}
            </ng-container>
          </div>
        </li>
      </ul>
    </mat-card-content>
  </mat-card>
  `,
  styles: [`
  ul {
    padding-left: 0;
    margin-bottom: 0;
    list-style-type: none;
  }
  li {
    line-height: 1.3em;
    padding: 4px 0;
  }
  .position {
    color: #9b9b9b;
    font-size: 14px;
    margin-left: 15px;
  }
  `],
  })
export class ParticipantsComponent {
  @Input() mission: Mission;
  @Input() participants: Participant[];
  constructor() {}
}
