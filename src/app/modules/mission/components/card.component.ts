import { Component, OnInit, Input } from '@angular/core';
import { Mission } from '../models/mission.model';
import { Store } from '@ngrx/store';
import * as fromMission from '../reducers';
import { MissionActions } from '../actions';

@Component({
  selector: 'app-mission-card',
  template: `
  <mat-card [ngClass]="{ orange: mission.active, grey: !mission.active }">
    <mat-card-title><span>{{ mission.name }}</span></mat-card-title>
    <mat-card-content>
      {{ mission.description }}
    </mat-card-content>
    <mat-card-actions>
      <span> {{ 'MISSION.PARTICIPANTS' | translate: { number: mission.participants.length } }} </span>
      <button mat-button mat-flat-button color="primary" [matBadgeHidden]="mission.unreadMessages === 0"
        [matBadge]="mission.unreadMessages" matBadgeColor="warn" (click)="goToMission(mission.id)">
        {{ (mission.active ? 'MISSION.PARTICIPATE' : 'MISSION.READ') | translate }}
      </button>
    </mat-card-actions>
  </mat-card>
  `,
  styles: [``],
})
export class CardComponent implements OnInit {
  @Input() mission: Mission;
  constructor(private store: Store<fromMission.State>) {}
  ngOnInit() {}
  goToMission(id: number) {
    this.store.dispatch(MissionActions.redirectMissionPage({ id }));
  }
}
