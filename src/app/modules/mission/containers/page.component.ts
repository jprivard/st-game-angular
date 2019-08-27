import * as fromMission from '../reducers';
import { Store, select } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';
import { MissionActions } from '../actions';
import { Subject } from 'rxjs';
import { takeUntil, take, skipWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-page-mission',
  template: `
  <div class="container" *ngIf="(mission$ | async) as mission">
    <div class="col-12">
      <mat-card>
        <mat-card-title><span>{{ mission.name | uppercase }}</span></mat-card-title>
        <mat-card-content *ngIf="(participants$ | async) as participants">
          <div class="row">
            <div class="coll-12 col-md-8">
              <mat-card class="orange">
                <mat-card-title><span>{{ 'MISSION.DESCRIPTION' | translate }}</span></mat-card-title>
                <mat-card-content>
                  {{ mission.description }}
                </mat-card-content>
              </mat-card>
            </div>
            <div class="col-12 col-md-4">
              <app-mission-participants [mission]="mission" [participants]="participants"></app-mission-participants>
            </div>
          </div>
          <div class="row">
            <div class="col-12" *ngIf="(messages$ | async) as messages">
              <app-mission-messages [mission]="mission" [messages]="messages" [step]="step"
                [participants]="participants" (markAsRead)="markAsRead($event)">
              </app-mission-messages>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  </div>`,
  styles: [``]
})
export class PageComponent implements OnDestroy {
  participants$ = this.missionStore.pipe(select(fromMission.getParticipants));
  mission$ = this.missionStore.pipe(select(fromMission.getSelectedMission));
  messages$ = this.missionStore.pipe(select(fromMission.getMessages));
  missionId = 0;
  step = 0;
  onDestroy$ = new Subject();

  constructor(
    private missionStore: Store<fromMission.State>,
    private route: ActivatedRoute
  ) {
    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      if (this.missionId !== params.id) {
        this.missionId = params.id;
        this.missionStore.dispatch(MissionActions.setSelectedMission({ id: Number(params.id) }));
      }
    });
    this.messages$.pipe(skipWhile(m => m.length === 0), take(1)).subscribe(messages => {
      const lastRead = messages.findIndex(m => !m.read);
      this.step = lastRead === -1 ? messages.length - 1 : lastRead;
    });
  }

  markAsRead(message: Message) {
    this.missionStore.dispatch(MissionActions.setMarkAsReadRequest({ mission: this.missionId, message: message.id }));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
