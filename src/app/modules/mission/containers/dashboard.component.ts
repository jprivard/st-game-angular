import * as fromMission from '../reducers';
import * as fromAuth from '../../auth/reducers';
import { Store, select } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';
import { MissionActions } from '../actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dash-missions',
  template: `
  <mat-card>
    <mat-card-title><span>{{ 'MISSION.LOGS' | translate | uppercase }}</span></mat-card-title>
    <mat-card-content>
      <ng-container *ngIf="(missions$ | async) !== null">
        <app-mission-card *ngFor="let mission of (missions$ | async)" [mission]="mission"></app-mission-card>
      </ng-container>
    </mat-card-content>
  </mat-card>
  `,
  styles: [`
  .container {
    margin-top: 25px;
  }
  `]
})
export class DashboardComponent implements OnDestroy {
  user$ = this.authStore.pipe(select(fromAuth.getUser));
  missions$ = this.missionStore.pipe(select(fromMission.getMissions));
  onDestroy$ = new Subject();
  characterId = 0;
  constructor(
    private authStore: Store<fromAuth.State>,
    private missionStore: Store<fromMission.State>
  ) {
    this.user$.pipe(takeUntil(this.onDestroy$)).subscribe(user => {
      if (user && this.characterId !== user.selectedCharacter) {
        this.characterId = user.selectedCharacter;
        this.missionStore.dispatch(MissionActions.getMissionsRequest());
      }
    });
  }
  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
