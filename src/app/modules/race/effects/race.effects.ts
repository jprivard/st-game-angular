import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { RaceService } from '../services';

@Injectable()
export class RaceEffects {
  /*
  list$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.getCharactersRequest),
    exhaustMap(() =>
      this.service.list().pipe(
        map(characters => CharacterActions.getCharactersSuccess({ characters })),
        catchError(error => of(CharacterActions.getCharactersFail({ error })))
      )
    )
  ));
  */

  constructor(
    private actions$: Actions,
    private service: RaceService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
