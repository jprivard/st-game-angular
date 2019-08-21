import { Action, createFeatureSelector, createSelector, createReducer, on } from '@ngrx/store';
import { ProcessInterface } from '../../core/interfaces/process.interface';
import * as AuthActions from '../actions/auth.actions';
import { ProcessStatus } from '../../core/enums/process-status.enum';
import { User } from '../models/user.model';
import * as fromRoot from '../../../reducers/index';

export const authFeatureKey = 'auth';

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
  on(AuthActions.logoutRequest, (state) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }})
  ),
  on(AuthActions.logoutSuccess, (state) => ({ ...initialState }))
);

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}
export const selectAuthState = createFeatureSelector<State, AuthState>(authFeatureKey);
export const getUser = createSelector(selectAuthState, (state: AuthState) => state.user);
export const getLoggedIn = createSelector(getUser, user => !!user);
export const getIsAuth = createSelector(selectAuthState, (state: AuthState) => {
  if (state.process.status === ProcessStatus.Completed) {
    return !!state.user;
  }
});
export const getError = createSelector(selectAuthState, (state: AuthState) => state.process.error);
export const getIsPending = createSelector(selectAuthState, (state: AuthState) => {
  return state.process.status === ProcessStatus.Processing;
});

