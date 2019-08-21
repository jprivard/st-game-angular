import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcessStatus } from '../../core/enums/process-status.enum';
import * as fromRoot from '../../../reducers/index';
import { AuthState } from './auth.reducer';

// Export necessity for functionning reducer
export * from './auth.reducer';
export const authFeatureKey = 'auth';
export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

// Export every selectors
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
