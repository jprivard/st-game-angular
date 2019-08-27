import * as fromCharacter from '../modules/character/reducers';
import * as fromAuth from '../modules/auth/reducers';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterActions } from '../modules/character/actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-7">
        <app-dash-missions></app-dash-missions>
      </div>
      <div class="col-12 col-md-5">
        <app-char-card *ngIf="(character$ | async) !== null" [character]="character$ | async"></app-char-card>
      </div>
    </div>
  </div>`,
  styles: [``]
})
export class DashboardComponent implements OnDestroy {
  user$ = this.authStore.pipe(select(fromAuth.getUser));
  character$ = this.characterStore.pipe(select(fromCharacter.getSelectedCharacter));
  onDestroy$ = new Subject();
  selected = 0;
  constructor(
    private authStore: Store<fromAuth.State>,
    private characterStore: Store<fromCharacter.State>
  ) {
    this.user$.pipe(takeUntil(this.onDestroy$)).subscribe (user => {
      if (user && this.selected !== user.selectedCharacter) {
        this.selected = user.selectedCharacter;
        this.characterStore.dispatch(CharacterActions.getCharactersRequest({ lastSelected: this.selected }));
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
