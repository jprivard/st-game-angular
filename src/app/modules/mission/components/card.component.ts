import { Component, OnInit, Input } from '@angular/core';
import { Mission } from '../models/mission.model';

@Component({
  selector: 'app-mission-card',
  template: `
  <mat-card [ngClass]="{ orange: mission.active, grey: !mission.active }">
    <mat-card-title><span>{{ mission.name }}</span></mat-card-title>
    <mat-card-content>
      <p>{{ mission.description }}</p>
    </mat-card-content>
  </mat-card>
  `,
  styles: [`
  p {
    margin-top: 15px !important;
    font-size: 1.3em;
  }
  `],
})
export class CardComponent implements OnInit {
  @Input() mission: Mission;
  constructor() {}
  ngOnInit() {}
}
