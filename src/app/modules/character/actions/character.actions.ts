import { createAction, props } from '@ngrx/store';
import { Character } from '../models/character.model';
import { User } from '../../auth/models/user.model';

// Get Characters sequence
export const getCharactersRequest = createAction('[Character] Get Characters Request',
props<{ lastSelected: number }>()
);
export const getCharactersSuccess = createAction('[Character] Get Characters Success',
  props<{ characters: Character[], lastSelected: number }>()
);
export const getCharactersFail = createAction('[Character] Get Characters Fail',
  props<{ error: string }>()
);

// Select Character sequence
export const selectCharacter = createAction('[Character] Select Character',
  props<{ character: Character }>()
);
export const selectCharacterSuccess = createAction('[Character] Select Character Success',
  props<{ user: User }>()
);
export const selectCharacterFail = createAction('[Character] Select Characters Fail',
  props<{ error: string }>()
);

// Create Character Sequence
export const createCharacter = createAction('[Character] Create Character');
export const createCharacterRequest = createAction('[Character] Create Character Request',
  props<{ character: Character }>()
);
export const createCharacterSuccess = createAction('[Character] Create Characters Success',
  props<{ characters: Character[] }>()
);
export const createCharacterFail = createAction('[Character] Create Characters Fail',
  props<{ error: string }>()
);
export const createCharacterCancel = createAction('[Character] Create Character Cancel');

// Others
export const chooseCharacter = createAction('[Character] Choose Character');
