import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, skipWhile } from 'rxjs/operators';
import { AuthActions } from '../actions';
import * as fromAuth from '../reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}
  canActivate(): Observable<boolean> {
    this.store.dispatch(AuthActions.checkSessionRequest());
    return this.store.pipe(
      select(fromAuth.getIsAuth),
      skipWhile(val => typeof val === 'undefined'),
      map(authed => {
        if (!authed) {
          this.store.dispatch(AuthActions.loginRedirect());
        }
        return authed;
      }),
      take(1)
    );
  }
}
