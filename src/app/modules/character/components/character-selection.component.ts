import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromCharacter from '../reducers';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-selection',
  template: `
  <mat-form-field>
    <mat-label>{{ 'CHARACTER.ACTIVE_LIST' | translate }}</mat-label>
    <mat-select [(value)]="selected">
      <mat-option *ngFor="let character of characters$ | async" [value]="character">
        {{ character | fullname }}
      </mat-option>
    </mat-select>
  </mat-form-field>
  <br/>
  <button mat-button [disabled]="selected === null" [mat-dialog-close]="selected">
    {{ 'CHARACTER.CHOOSE' | translate }}
  </button>
  `,
  styleUrls: [],
})
export class CharacterSelectionComponent implements OnInit {
  characters$ = this.store.pipe(select(fromCharacter.getCharacters));
  selected: Character = null;
  constructor(private store: Store<fromCharacter.State>) {}
  ngOnInit() {}
}
