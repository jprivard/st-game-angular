import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-card',
  template: `
    <mat-card>
      <mat-card-title>{{ character.firstName }} {{ character.lastName }}</mat-card-title>
      <mat-card-content>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-4">{{ 'CHARACTER.RANK' | translate }}</div>
            <div class="col-12 col-md-8">{{ character.rank | translate }}</div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">{{ 'CHARACTER.RACE' | translate }}</div>
            <div class="col-12 col-md-8">{{ character.race | translate }}</div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">{{ 'CHARACTER.DOB' | translate }}</div>
            <div class="col-12 col-md-8">{{ character.stardateOfBirth | date:'yyyy-MM-dd' }}</div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">{{ 'CHARACTER.ACTIVE_ASSIGNMENTS' | translate }}</div>
            <div class="col-12 col-md-8">
              <ul>
                <li *ngFor="let assignment of character.assignments.active">
                  <div class="assignment">{{ assignment.position | translate }} - {{ assignment.ship }}</div>
                  <div class="date">Depuis {{ assignment.start | date:'yyyy' }}</div>
              </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">{{ 'CHARACTER.PAST_ASSIGNMENTS' | translate }}</div>
            <div class="col-12 col-md-8">
              <ul>
                <li *ngFor="let assignment of character.assignments.past">
                  <div class="assignment">{{ assignment.position | translate }} - {{ assignment.ship }}</div>
                  <div class="date">De {{ assignment.start | date:'yyyy' }} à {{ assignment.end | date:'yyyy' }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character;
  constructor() {}
  ngOnInit() {}
}
