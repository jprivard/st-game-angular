import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-card',
  template: `
    <mat-card>
      <mat-card-title>{{ character | fullname }}</mat-card-title>
      <mat-card-content>
        <div class="container">
          <app-char-row title="CHARACTER.RANK" [data]="character.rank | translate"></app-char-row>
          <app-char-row title="CHARACTER.RACE" [data]="character.race | translate"></app-char-row>
          <app-char-row title="CHARACTER.DOB" [data]="character.stardateOfBirth | date:'yyyy-MM-dd'"></app-char-row>
          <app-assignment title="CHARACTER.ACTIVE_ASSIGNMENTS" [assignments]="character.assignments.active"></app-assignment>
          <app-assignment title="CHARACTER.PAST_ASSIGNMENTS" [assignments]="character.assignments.past"></app-assignment>
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