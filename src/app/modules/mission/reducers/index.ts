import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import { MissionState } from './mission.reducer';
import { Mission } from '../models/mission.model';
import { Participant } from '../models/participant.model';
import { Message } from '../models/message.model';

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
export const getSelectedMission = createSelector(selectMissionState,
  (state: MissionState): Mission => state.list.filter(m => m.id === state.selected)[0]
);
export const getParticipants = createSelector(selectMissionState,
  (state: MissionState): Participant[] => state.participants
);
export const getMessages = createSelector(selectMissionState,
  (state: MissionState): Message[] => state.messages
);
