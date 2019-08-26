import * as fromMission from '../reducers';
import * as fromCharacter from '../../character/reducers';
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
  character$ = this.characterStore.pipe(select(fromCharacter.getSelectedCharacter));
  missions$ = this.missionStore.pipe(select(fromMission.getMissions));
  onDestroy$ = new Subject();
  characterId = 0;
  constructor(
    private characterStore: Store<fromCharacter.State>,
    private missionStore: Store<fromMission.State>
  ) {
    this.character$.pipe(takeUntil(this.onDestroy$)).subscribe(character => {
      if (character && this.characterId !== character.id) {
        this.characterId = character.id;
        this.missionStore.dispatch(MissionActions.getMissionsRequest());
      }
    });
  }
  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
