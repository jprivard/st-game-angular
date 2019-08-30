import { Component } from '@angular/core';
import { AuthActions } from '../actions';
import { Credentials } from '../models/credentials.model';
import * as fromAuth from '../reducers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-create-page',
  template: `
<app-create-form
  (submitted)="create($event)"
  (redirect)="redirect($event)"
  [pending]="pending$ | async"
  [completed]="completed$ | async"
  [errorMessage]="error$ | async">
</app-create-form>`,
  styles: []
})
export class CreatePageComponent {
  pending$ = this.store.pipe(select(fromAuth.getIsPending));
  completed$ = this.store.pipe(select(fromAuth.getIsCompleted));
  error$ = this.store.pipe(select(fromAuth.getError));

  constructor(private store: Store<fromAuth.State>) {}

  public create(credentials: Credentials) {
    this.store.dispatch(AuthActions.createRequest({ credentials }));
  }

  public redirect() {
    this.store.dispatch(AuthActions.loginRedirect());
  }
}
