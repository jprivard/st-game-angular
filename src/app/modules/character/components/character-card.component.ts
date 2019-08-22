import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-card',
  template: `
    <mat-card>
      <mat-card-title>{{ character.rank | translate }} {{ character.firstName }} {{ character.lastName }}</mat-card-title>
      <mat-card-content>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-4">{{ 'CHARACTER.ASSIGNMENTS' | translate }}</div>
            <div class="col-12 col-md-8">
              <ul>
                <li *ngFor="let assignment of character.assignments">
                  {{ assignment.position | translate }} - {{ assignment.ship }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">{{ 'CHARACTER.RACE' | translate }}</div>
            <div class="col-12 col-md-8">{{ character.race | translate }}</div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">{{ 'CHARACTER.DOB' | translate }}</div>
            <div class="col-12 col-md-8">{{ character.stardateOfBirth }}</div>
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
