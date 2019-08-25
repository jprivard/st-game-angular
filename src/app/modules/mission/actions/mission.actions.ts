import { createAction, props } from '@ngrx/store';
import { Mission } from '../models/mission.model';

// Get Missions sequence
export const getMissionsRequest = createAction('[Race] Get Missions Request');
export const getMissionsSuccess = createAction('[Race] Get Missions Success',
  props<{ missions: Mission[] }>()
);
export const getMissionsFail = createAction('[Race] Get Missions Fail',
  props<{ error: string }>()
);
