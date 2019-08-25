import { ProcessInterface } from '../../core/interfaces/process.interface';
import { ProcessStatus } from '../../core/enums/process-status.enum';
import { createReducer, on } from '@ngrx/store';
import { Character } from '../models/character.model';
import { CharacterActions } from '../actions';

export interface CharacterState {
  list: Character[];
  selected: Character;
  process: ProcessInterface;
}

export const initialState: CharacterState = {
  list: null,
  selected: null,
  process: {
    error: null,
    entity: null,
    action: null,
    status: ProcessStatus.Normal
  }
};

export const reducer = createReducer(
  initialState,
  on(CharacterActions.getCharactersRequest, (state) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }
  })),
  on(CharacterActions.getCharactersSuccess, (state, { characters }) => ({
    ...state, list: characters, process : {
      ...initialState.process, status: ProcessStatus.Completed
    }
  })),
  on(CharacterActions.selectCharacter, (state, { character }) => ({
    ...state, selected: character
  })),
  on(CharacterActions.createCharacterRequest, (state, { character }) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }
  })),
  on(CharacterActions.createCharacterSuccess, (state, { characters }) => ({
    ...state, list: state.list.concat(characters), selected: characters[0], process: {
      ...initialState.process, status: ProcessStatus.Completed
    }
  })),

  /*on(AuthActions.checkSessionRequest, (state) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }})
  )*/
);
