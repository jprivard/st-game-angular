import { Component, OnInit, Input } from '@angular/core';
import { Mission } from '../models/mission.model';

@Component({
  selector: 'app-mission-card',
  template: `
  <mat-card [ngClass]="{ orange: mission.active, grey: !mission.active }">
    <mat-card-title><span>{{ mission.name }}</span></mat-card-title>
    <mat-card-content>
      {{ mission.description }}
    </mat-card-content>
    <mat-card-actions>
      <button mat-button mat-flat-button color="primary">
        {{ (mission.active ? 'MISSION.PARTICIPATE' : 'MISSION.READ') | translate }}
      </button>
    </mat-card-actions>
  </mat-card>
  `,
  styles: [``],
})
export class CardComponent implements OnInit {
  @Input() mission: Mission;
  constructor() {}
  ngOnInit() {}
}
