import * as fromMission from '../reducers';
import { Store, select } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';
import { MissionActions } from '../actions';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, take, skipWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/message.model';
import { FormControl } from '@angular/forms';

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
                <mat-card-actions>
                  <mat-button-toggle-group multiple [formControl]="filters" #group="matButtonToggleGroup">
                    <mat-button-toggle value="new" multiple aria-label="Nouveaux">
                      <mat-icon>new_releases</mat-icon>
                    </mat-button-toggle>
                    <mat-button-toggle value="story" aria-label="Histoire">
                      <mat-icon>chrome_reader_mode</mat-icon>
                    </mat-button-toggle>
                    <mat-button-toggle value="rp" aria-label="Roleplay">
                      <mat-icon>person</mat-icon>
                    </mat-button-toggle>
                    <mat-button-toggle value="hrp" aria-label="Hors-Roleplay">
                      <mat-icon>people_alt</mat-icon>
                    </mat-button-toggle>
                  </mat-button-toggle-group>
                </mat-card-actions>
              </mat-card>
            </div>
            <div class="col-12 col-md-4">
              <app-mission-participants [mission]="mission" [participants]="participants"></app-mission-participants>
            </div>
          </div>
          <div class="row">
            <div class="col-12" *ngIf="(messages$ | async) as messages">
              <app-mission-messages [filters]="filters.value" [messages]="messages" [step]="step"
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
  onDestroy$ = new Subject();
  step: number;
  filters = new FormControl(['new', 'story', 'rp', 'hrp']);
  missionId = 0;

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
