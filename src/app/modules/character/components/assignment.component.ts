import { Component, Input } from '@angular/core';
import { Assignment } from '../models/character.model';

@Component({
  selector: 'app-assignment',
  template: `
    <div class="row">
      <div class="col-12 col-md-4">{{ title | translate }}</div>
      <div class="col-12 col-md-8">
        <ul>
          <li *ngFor="let assignment of assignments">
            <div class="assignment">{{ assignment | positionAndShip }}</div>
            <div *ngIf="assignment.start && assignment.end" class="date">
              <span translate
                [translateParams]="{
                  start: (assignment.start | date:'yyyy'),
                  end: (assignment.end | date:'yyyy')
                }">CHARACTER.FROM_TO</span>
            </div>
            <div *ngIf="assignment.start && !assignment.end" class="date">
            <span translate
            [translateParams]="{ start: (assignment.start | date:'yyyy') }">CHARACTER.SINCE</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./assignment.component.scss'],
})
export class AssignmentComponent {
  @Input() title: string;
  @Input() assignments: Assignment[];
  constructor() {}
}
