import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromCharacter from '../reducers';

@Component({
  selector: 'app-character-selection',
  template: `
  <mat-form-field>
    <mat-label>Choose</mat-label>
    <mat-select>
      <mat-option *ngFor="let character of characters$ | async" [value]="character">{{ character.firstName }} {{ character.lastName }}</mat-option>
    </mat-select>
  </mat-form-field>
  `,
  styleUrls: [],
})
export class CharacterSelectionComponent implements OnInit {
  characters$ = this.store.pipe(select(fromCharacter.getCharacters));
  constructor(private store: Store<fromCharacter.State>) {}
  ngOnInit() {}
}
