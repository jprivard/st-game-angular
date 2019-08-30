import { User } from '../models/user.model';
import { ProcessInterface } from '../../core/interfaces/process.interface';
import { ProcessStatus } from '../../core/enums/process-status.enum';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions';

export interface AuthState {
  user: User | null;
  process: ProcessInterface;
}

export const initialState: AuthState = {
  user: null,
  process: {
    error: null,
    entity: null,
    action: null,
    status: ProcessStatus.Normal
  }
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.checkSessionRequest, (state) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }})
  ),
  on(AuthActions.checkSessionSuccess, (state, { user }) => ({
    ...state, user, process: {
      ...initialState.process, status: ProcessStatus.Completed
    }})
  ),
  on(AuthActions.loginRequest, (state) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }})
  ),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state, user, process: {
      ...initialState.process, status: ProcessStatus.Completed
    }})
  ),
  on(AuthActions.loginFail, (state, { error }) => ({
    ...state, process: {
      ...initialState.process, error, status: ProcessStatus.Failed
    }})
  ),
  on(AuthActions.createRequest, (state) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }})
  ),
  on(AuthActions.createSuccess, (state, { message }) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Completed
    }})
  ),
  on(AuthActions.createFail, (state, { error }) => ({
    ...state, process: {
      ...initialState.process, error, status: ProcessStatus.Failed
    }})
  ),
  on(AuthActions.logoutRequest, (state) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }})
  ),
  on(AuthActions.updateSelectedCharacter, (state, { user }) => {
    if ( state.user.selectedCharacter === user.selectedCharacter ) { return state; }
    return {
      ...state, user: {
        ... state.user, selectedCharacter: user.selectedCharacter
      }};
  }),
  on(AuthActions.logoutSuccess, (state) => ({ ...initialState }))
);
