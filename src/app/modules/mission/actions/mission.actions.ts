import { createAction, props } from '@ngrx/store';
import { Mission } from '../models/mission.model';

// Get Missions sequence
export const getMissionsRequest = createAction('[Mission] Get Missions Request');
export const getMissionsSuccess = createAction('[Mission] Get Missions Success',
  props<{ missions: Mission[] }>()
);
export const getMissionsFail = createAction('[Mission] Get Missions Fail',
  props<{ error: string }>()
);

export const setSelectedMission = createAction('[Mission] Set Selected Mission',
  props<{ id: number }>()
);

// Navigation
export const redirectMissionPage = createAction('[Mission] Redirect Mission Page',
  props<{ id: number }>()
);
