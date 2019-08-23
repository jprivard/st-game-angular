import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromCharacter from '../reducers';
import { Character } from '../models/character.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-char-creation',
  template: `
    <h2 mat-dialog-title>{{ 'CHARACTER.CREATE_CHARACTER' | translate }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <app-form-input [form]="form" name="firstName" text="CHARACTER.FIRST_NAME"></app-form-input>
        <app-form-input [form]="form" name="lastName" text="CHARACTER.LAST_NAME"></app-form-input>
        <app-form-date [form]="form" name="stardateOfBirth" text="CHARACTER.DOB"></app-form-date>
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
  mat-form-field {
    margin-bottom: 10px;
  }
  mat-dialog-actions {
    float: right;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  `],
})
export class CreationComponent implements OnInit {
  character: Character = null;
  form: FormGroup;
  constructor(private store: Store<fromCharacter.State>) {}
  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [ Validators.required ]),
      lastName: new FormControl('', [ Validators.required ]),
      stardateOfBirth: new FormControl('', [ Validators.required ]),
    });
  }
  errorsOf(field: string) {
    return Object.keys(this.form.get(field).errors);
  }
}
