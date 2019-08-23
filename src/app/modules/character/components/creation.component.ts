import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRace from '../../race/reducers';
import * as fromRank from '../../rank/reducers';
import * as fromAuth from '../../auth/reducers';
import { Character } from '../models/character.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RaceActions } from '../../race/actions';
import { RankActions } from '../../rank/actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-char-creation',
  template: `
    <h2 mat-dialog-title>{{ 'CHARACTER.CREATE_CHARACTER' | translate }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <app-form-input [form]="form" name="firstName" text="CHARACTER.FIRST_NAME"></app-form-input>
        <app-form-input [form]="form" name="lastName" text="CHARACTER.LAST_NAME"></app-form-input>
        <app-form-date [form]="form" name="stardateOfBirth" text="CHARACTER.DOB"></app-form-date>
        <app-form-select-id-text *ngIf="(races$ | async) !== null" [form]="form" name="race" text="CHARACTER.RACE" [items]="(races$ | async)"></app-form-select-id-text>
        <app-form-select-id-text *ngIf="(ranks$ | async) !== null" [form]="form" name="rank" text="CHARACTER.RANK" [items]="(ranks$ | async)"></app-form-select-id-text>
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
export class CreationComponent implements OnInit, OnDestroy {
  races$ = this.raceStore.pipe(select(fromRace.getRaces));
  ranks$ = this.rankStore.pipe(select(fromRank.getRanks));
  isAdmin$ = this.authStore.pipe(select(fromAuth.getIsAdmin));
  onDestroy$ = new Subject();
  character: Character = null;
  form: FormGroup;
  constructor(
    private raceStore: Store<fromRace.State>,
    private rankStore: Store<fromRank.State>,
    private authStore: Store<fromAuth.State>,
  ) {
    this.raceStore.dispatch(RaceActions.getRacesRequest());
    this.rankStore.dispatch(RankActions.getRanksRequest());
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [ Validators.required ]),
      lastName: new FormControl('', [ Validators.required ]),
      stardateOfBirth: new FormControl('', [ Validators.required ]),
      race: new FormControl('', [ Validators.required ]),
      rank: new FormControl(1, [ Validators.required ]),
    });
    this.isAdmin$.pipe(takeUntil(this.onDestroy$)).subscribe(isAdmin => {
      if (!isAdmin) {
        this.form.get('rank').disable();
      }
    });
    this.form.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(val => {
      this.character = ({ ...val, stardateOfBirth: this.formatDate(val.stardateOfBirth) }) as Character;
    });
  }

  formatDate(date: Date) {
    const result = date ? `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }` : '';
    return result;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
