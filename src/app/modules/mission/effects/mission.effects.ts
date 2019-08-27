import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MissionService } from '../services';
import { MissionActions } from '../actions';
import { exhaustMap, catchError, map, tap, switchMap } from 'rxjs/operators';
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

  select$ = createEffect(() => this.actions$.pipe(
    ofType(MissionActions.setSelectedMission),
    map(action => action.id),
    switchMap(id => [
      MissionActions.getParticipantsRequest({ id }),
      MissionActions.getMessagesRequest({ id })
    ])
  ));

  participants$ = createEffect(() => this.actions$.pipe(
    ofType(MissionActions.getParticipantsRequest),
    map(action => action.id),
    exhaustMap(id =>
      this.service.getParticipants(id).pipe(
        map(participants => MissionActions.getParticipantsSuccess({ participants })),
        catchError(error => of(MissionActions.getParticipantsFail({ error })))
      )
    )
  ));

  messages$ = createEffect(() => this.actions$.pipe(
    ofType(MissionActions.getMessagesRequest),
    map(action => action.id),
    exhaustMap(id =>
      this.service.getMessages(id).pipe(
        map(messages => MissionActions.getMessagesSuccess({ messages })),
        catchError(error => of(MissionActions.getMessagesFail({ error })))
      )
    )
  ));

  read$ = createEffect(() => this.actions$.pipe(
    ofType(MissionActions.setMarkAsReadRequest),
    exhaustMap(action =>
      this.service.markAsRead(action.mission, action.message).pipe(
        map(message => MissionActions.setMarkAsReadSuccess({ message: action.message })),
        catchError(error => of(MissionActions.setMarkAsReadFail({ error })))
      )
    )
  ));

  missionPage$ = createEffect(() => this.actions$.pipe(
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
