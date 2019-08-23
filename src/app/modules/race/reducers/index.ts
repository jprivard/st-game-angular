import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import { RaceState } from './race.reducer';

// Export necessity for functionning reducer
export * from './race.reducer';
export const raceFeatureKey = 'race';
export interface State extends fromRoot.State {
  [raceFeatureKey]: RaceState;
}

// Export every selectors
export const selectRaceState = createFeatureSelector<State, RaceState>(raceFeatureKey);
export const getRaces = createSelector(selectRaceState,
  (state: RaceState) => state.list
);
