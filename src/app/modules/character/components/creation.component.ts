import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRace from '../../race/reducers';
import { Character } from '../models/character.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RaceActions } from '../../race/actions';

@Component({
  selector: 'app-char-creation',
  template: `
    <h2 mat-dialog-title>{{ 'CHARACTER.CREATE_CHARACTER' | translate }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <app-form-input [form]="form" name="firstName" text="CHARACTER.FIRST_NAME"></app-form-input>
        <app-form-input [form]="form" name="lastName" text="CHARACTER.LAST_NAME"></app-form-input>
        <app-form-date [form]="form" name="stardateOfBirth" text="CHARACTER.DOB"></app-form-date>
        <app-form-select-id-text *ngIf="(races$ | async) !== null"
          [form]="form" name="race" text="CHARACTER.RACE" [items]="(races$ | async)"></app-form-select-id-text>
      </form>
    </mat-dialog-content>
    <app-form-cancel-submit [form]="form" cancel="false" [submit]="character"></app-form-cancel-submit>
  `,
  styles: [`
  mat-form-field {
    margin-bottom: 10px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  `],
})
export class CreationComponent implements OnInit {
  races$ = this.store.pipe(select(fromRace.getRaces));
  character: Character = null;
  form: FormGroup;
  constructor(private store: Store<fromRace.State>) {
    this.store.dispatch(RaceActions.getRacesRequest());
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [ Validators.required ]),
      lastName: new FormControl('', [ Validators.required ]),
      stardateOfBirth: new FormControl('', [ Validators.required ]),
      race: new FormControl('', [ Validators.required ])
    });
  }
}
