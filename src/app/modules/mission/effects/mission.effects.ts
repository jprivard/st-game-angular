import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MissionService } from '../services';
import { MissionActions } from '../actions';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MissionEffects {
  list$ = createEffect(() => this.actions$.pipe(
    ofType(MissionActions.getMissionsRequest),
    exhaustMap(() =>
      this.service.list().pipe(
        map(missions => MissionActions.getMissionsSuccess({ missions })),
        catchError(error => of(MissionActions.getMissionsFail({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private service: MissionService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
