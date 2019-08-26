import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MissionService } from '../services';
import { MissionActions } from '../actions';
import { exhaustMap, catchError, map, tap } from 'rxjs/operators';
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

  $missionPage = createEffect(() => this.actions$.pipe(
    ofType(MissionActions.redirectMissionPage),
    map(action => action.id),
    tap(id => {
      this.router.navigate([`/mission/${ id }/`]);
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private service: MissionService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
