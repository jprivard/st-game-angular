import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import { CharacterState } from './character.reducer';

// Export necessity for functionning reducer
export * from './character.reducer';
export const characterFeatureKey = 'character';
export interface State extends fromRoot.State {
  [characterFeatureKey]: CharacterState;
}

// Export every selectors
export const selectCharacterState = createFeatureSelector<State, CharacterState>(characterFeatureKey);
export const getCharacters = createSelector(selectCharacterState,
  (state: CharacterState) => state.list
);
export const getAmountOfCharaters = createSelector(selectCharacterState,
  (state: CharacterState) => state.list !== null ? state.list.length : 0
);
export const getSelectedCharacter = createSelector(selectCharacterState,
  (state: CharacterState) => state.selected
);
