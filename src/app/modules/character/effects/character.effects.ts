import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CharacterActions } from '../actions';
import { CharacterService } from '../services';
import { Character } from '../models/character.model';
import { SelectionComponent } from '../components/selection.component';
import { CreationComponent } from '../components/creation.component';
import { AuthActions } from '../../auth/actions';

@Injectable()
export class CharacterEffects {

  list$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.getCharactersRequest),
    map(action => action.lastSelected),
    exhaustMap((lastSelected) =>
      this.service.list().pipe(
        map(characters => CharacterActions.getCharactersSuccess({ characters, lastSelected })),
        catchError(error => of(CharacterActions.getCharactersFail({ error })))
      )
    )
  ));

  listSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.getCharactersSuccess),
    map(({ characters, lastSelected }) => {
      const selected = characters.filter(c => c.id === lastSelected);
      if (selected.length > 0) { return CharacterActions.selectCharacter({ character: selected[0] }); }
      if (characters.length > 1) { return CharacterActions.chooseCharacter(); }
      if (characters.length === 1) { return CharacterActions.selectCharacter({ character: characters[0] }); }
      return CharacterActions.createCharacter();
    })
  ));

  select$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.selectCharacter),
    map(action => action.character),
    exhaustMap((character) =>
      this.service.setSelected(character).pipe(
        map(user => CharacterActions.selectCharacterSuccess({ user })),
        catchError(error => of(CharacterActions.selectCharacterFail({ error })))
      )
    )
  ));

  selectSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.selectCharacterSuccess),
    map((action) => AuthActions.updateSelectedCharacter({ user: action.user }))
  ));

  chooseCharacter$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.chooseCharacter),
    exhaustMap(() => {
      const dialogRef = this.dialog.open<SelectionComponent, undefined, Character>(SelectionComponent, {
        width: '600px',
      });
      return dialogRef.afterClosed();
    }),
    map((character: Character | string) => character && character !== 'false' ?
      CharacterActions.selectCharacter({ character: character as Character }) :
      CharacterActions.selectCharacterCancel()
    )
  ));

  createCharacter$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.createCharacter),
    exhaustMap(() => {
      const dialogRef = this.dialog.open<CreationComponent, undefined, Character>(CreationComponent, {
        width: '600px',
      });
      return dialogRef.afterClosed();
    }),
    map((character) => character ? CharacterActions.createCharacterRequest({ character }) : CharacterActions.createCharacterCancel())
  ));

  createCharacterRequest$ = createEffect(() => this.actions$.pipe(
    ofType(CharacterActions.createCharacterRequest),
    map(action => action.character),
    exhaustMap((character) =>
      this.service.create(character).pipe(
        map(characters => CharacterActions.createCharacterSuccess({ characters })),
        catchError(error => of(CharacterActions.createCharacterFail({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private service: CharacterService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
