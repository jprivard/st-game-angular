import * as fromCharacter from '../reducers';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { CharacterActions } from '../actions';

@Component({
  selector: 'app-character-page',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-7">
        <mat-card>
          <mat-card-title>---</mat-card-title>
          <mat-card-content>---</mat-card-content>
        </mat-card>
      </div>
      <div class="col-5">
        <app-char-card *ngIf="(character$ | async) !== null" [character]="character$ | async"></app-char-card>
      </div>
    </div>
  </div>`,
  styles: [`
  .container {
    margin-top: 25px;
  }
  `]
})
export class CharacterPageComponent implements OnInit {
  character$ = this.store.pipe(select(fromCharacter.getSelectedCharacter));
  constructor(private store: Store<fromCharacter.State>) {}
  ngOnInit() {
    this.store.dispatch(CharacterActions.getCharactersRequest());
  }
}
