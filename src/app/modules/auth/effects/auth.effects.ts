import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthActions } from '../actions';
import { AuthService } from '../services';
import { Credentials } from '../models/credentials.model';

@Injectable()
export class AuthEffects {

  checkSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkSessionRequest),
      exhaustMap(() =>
        this.authService.check().pipe(
          map(user => AuthActions.checkSessionSuccess({ user })),
          catchError(error => of(AuthActions.checkSessionFail()))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      map(action => action.credentials),
      exhaustMap((auth: Credentials) =>
        this.authService.login(auth).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(({ error }) => {
            console.log(error);
            return of(AuthActions.loginFail(error));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(() => AuthActions.authedRedirect())
    )
  );


  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createRequest),
      map(action => action.credentials),
      exhaustMap((auth: Credentials) =>
        this.authService.create(auth).pipe(
          map(message => AuthActions.createSuccess({ message })),
          catchError(({ error }) => of(AuthActions.createFail(error)))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutRequest),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(user => AuthActions.logoutSuccess()),
          catchError(error => of(AuthActions.logoutFail()))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      map(() => AuthActions.loginRedirect())
    )
  );

  authedRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authedRedirect),
        tap(authed => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginRedirect),
        tap(authed => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );


  /*
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );


  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          LogoutConfirmationDialogComponent,
          undefined,
          boolean
        >(LogoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map(
        result =>
          result
            ? AuthActions.logout()
            : AuthActions.logoutConfirmationDismiss()
      )
    )
  );

  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  );
  */

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
