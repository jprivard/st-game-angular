import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RankService } from '../services';
import { RankActions } from '../actions';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RaceEffects {
  list$ = createEffect(() => this.actions$.pipe(
    ofType(RankActions.getRanksRequest),
    exhaustMap(() =>
      this.service.list().pipe(
        map(ranks => RankActions.getRanksSuccess({ ranks })),
        catchError(error => of(RankActions.getRanksFail({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private service: RankService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
