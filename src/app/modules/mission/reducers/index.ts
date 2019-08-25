import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import { MissionState } from './mission.reducer';

// Export necessity for functionning reducer
export * from './mission.reducer';
export const missionFeatureKey = 'mission';
export interface State extends fromRoot.State {
  [missionFeatureKey]: MissionState;
}

// Export every selectors
export const selectMissionState = createFeatureSelector<State, MissionState>(missionFeatureKey);
export const getMissions = createSelector(selectMissionState,
  (state: MissionState) => state.list
);
