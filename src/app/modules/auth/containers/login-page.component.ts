import { Component } from '@angular/core';
import { AuthActions } from '../actions';
import { Credentials } from '../models/credentials.model';
import * as fromAuth from '../reducers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-login-page',
  template: `
<app-login-form
  (submitted)="login($event)"
  [pending]="pending$ | async"
  [errorMessage]="error$ | async">
</app-login-form>`,
  styles: []
})
export class LoginPageComponent {
  pending$ = this.store.pipe(select(fromAuth.getIsPending));
  error$ = this.store.pipe(select(fromAuth.getError));

  constructor(private store: Store<fromAuth.State>) {}

  public login(credentials: Credentials) {
    this.store.dispatch(AuthActions.loginRequest({ credentials }));
  }
}
