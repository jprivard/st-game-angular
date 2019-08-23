import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import { RankState } from './rank.reducer';

// Export necessity for functionning reducer
export * from './rank.reducer';
export const rankFeatureKey = 'rank';
export interface State extends fromRoot.State {
  [rankFeatureKey]: RankState;
}

// Export every selectors
export const selectRaceState = createFeatureSelector<State, RankState>(rankFeatureKey);
export const getRanks = createSelector(selectRaceState,
  (state: RankState) => state.list
);
