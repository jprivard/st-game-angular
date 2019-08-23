import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromCharacter from '../reducers';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-char-selection',
  template: `
  <h2>{{ 'CHARACTER.SELECT' | translate }}</h2>
  <mat-dialog-content>
    <mat-form-field>
      <mat-label>{{ 'CHARACTER.ACTIVE_LIST' | translate }}</mat-label>
      <mat-select [(value)]="selected">
        <mat-option *ngFor="let character of characters$ | async" [value]="character">
          {{ character | fullname }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-stroked-button mat-dialog-close="false">
      {{ 'CHARACTER.CANCEL' | translate }}
    </button>
    <button mat-button mat-flat-button color="primary" [disabled]="selected === null" [mat-dialog-close]="selected">
      {{ 'CHARACTER.SUBMIT' | translate }}
    </button>
  </mat-dialog-actions>
  `,
  styles: [`
  mat-dialog-actions {
    float: right;
  }
  `],
})
export class SelectionComponent implements OnInit {
  characters$ = this.store.pipe(select(fromCharacter.getCharacters));
  selected: Character = null;
  constructor(private store: Store<fromCharacter.State>) {}
  ngOnInit() {}
}
