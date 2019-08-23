import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromCharacter from '../reducers';
import { Character } from '../models/character.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-char-creation',
  template: `
    <h2 mat-dialog-title>{{ 'CHARACTER.CREATE_CHARACTER' | translate }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field>
          <input type="text" matInput formControlName="firstName" placeholder="{{ 'CHARACTER.FIRST_NAME' | translate }}"/>
        </mat-form-field>
        <mat-form-field>
          <input type="text" matInput formControlName="lastName" placeholder="{{ 'CHARACTER.LAST_NAME' | translate }}"/>
        </mat-form-field>
        <mat-form-field>
          <input matInput formControlName="stardateOfBirth" [matDatepicker]="picker" placeholder="{{ 'CHARACTER.DOB' | translate }}">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker startAt="2400-01-02"></mat-datepicker>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-stroked-button mat-dialog-close="false">
        {{ 'CHARACTER.CANCEL' | translate }}
      </button>
      <button mat-button mat-flat-button color="primary" [disabled]="!form.valid" [mat-dialog-close]="character">
        {{ 'CHARACTER.SUBMIT' | translate }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
  mat-dialog-actions {
    float: right;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  form > * {
    width: 100%;
  }
  `],
})
export class CreationComponent implements OnInit {
  character: Character = null;
  form: FormGroup;
  constructor(private store: Store<fromCharacter.State>) {}
  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      stardateOfBirth: new FormControl(),
    });
  }
}
