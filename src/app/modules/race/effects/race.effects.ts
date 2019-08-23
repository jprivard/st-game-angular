import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RaceService } from '../services';
import { RaceActions } from '../actions';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RaceEffects {
  list$ = createEffect(() => this.actions$.pipe(
    ofType(RaceActions.getRacesRequest),
    exhaustMap(() =>
      this.service.list().pipe(
        map(races => RaceActions.getRacesSuccess({ races })),
        catchError(error => of(RaceActions.getRacesFail({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private service: RaceService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
