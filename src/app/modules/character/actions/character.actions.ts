import { createAction, props } from '@ngrx/store';
import { Character } from '../models/character.model';

// Get Characters sequence
export const getCharactersRequest = createAction('[Character] Get Characters Request');
export const getCharactersSuccess = createAction('[Character] Get Characters Success',
  props<{ characters: Character[] }>()
);
export const getCharactersFail = createAction('[Character] Get Characters Fail',
  props<{ error: string }>()
);

// These actions are sent when we retrieve the character list
export const selectCharacter = createAction('[Character] Select Character',
  props<{ character: Character }>()
);
export const chooseCharacter = createAction('[Character] Choose Character');
export const createCharacter = createAction('[Character] Create Character');
