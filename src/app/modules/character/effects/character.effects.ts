import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CharacterActions } from '../actions';
import { CharacterService } from '../services';
import { Character } from '../models/character.model';
import { CharacterSelectionComponent } from '../components/character-selection.component';

@Injectable()
export class CharacterEffects {

  list$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.getCharactersRequest),
    exhaustMap(() =>
      this.service.list().pipe(
        map(characters => CharacterActions.getCharactersSuccess({ characters })),
        catchError(error => of(CharacterActions.getCharactersFail({ error })))
      )
    )
  ));

  listSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.getCharactersSuccess),
    map(action => action.characters),
    map((characters: Character[]) => {
      if (characters.length > 1) { return CharacterActions.chooseCharacter(); }
      if (characters.length === 1) { return CharacterActions.selectCharacter({ character: characters[0] }); }
      return CharacterActions.createFirstCharacter();
    })
  ));

  chooseCharacter$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.chooseCharacter),
    exhaustMap(() => {
      const dialogRef = this.dialog.open<CharacterSelectionComponent, undefined, Character>(CharacterSelectionComponent);
      return dialogRef.afterClosed();
    }),
    map((character) => character ? CharacterActions.selectCharacter({ character }) : CharacterActions.getCharactersFail({error: ''}))
  ));

  constructor(
    private actions$: Actions,
    private service: CharacterService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
