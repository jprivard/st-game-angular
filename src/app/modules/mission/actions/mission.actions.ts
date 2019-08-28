import { createAction, props } from '@ngrx/store';
import { Mission } from '../models/mission.model';
import { Participant } from '../models/participant.model';
import { Message } from '../models/message.model';
import { Group } from '../models/group.model';

// Get Missions sequence
export const getMissionsRequest = createAction('[Mission] Get Missions Request');
export const getMissionsSuccess = createAction('[Mission] Get Missions Success',
  props<{ missions: Mission[] }>()
);
export const getMissionsFail = createAction('[Mission] Get Missions Fail',
  props<{ error: string }>()
);

// Get Mission's participants Sequence
export const getParticipantsRequest = createAction('[Mission] Get Participants Request',
  props<{ id: number }>()
);
export const getParticipantsSuccess = createAction('[Mission] Get Participants Success',
  props<{ participants: Participant[] }>()
);
export const getParticipantsFail = createAction('[Mission] Get Participants Fail',
  props<{ error: string }>()
);

// Get Mission's messages Sequence
export const getMessagesRequest = createAction('[Mission] Get Messages Request',
  props<{ id: number }>()
);
export const getMessagesSuccess = createAction('[Mission] Get Messages Success',
  props<{ messages: Message[] }>()
);
export const getMessagesFail = createAction('[Mission] Get Messages Fail',
  props<{ error: string }>()
);

// Get Mission's messages Sequence
export const getGroupsRequest = createAction('[Mission] Get Groups Request',
  props<{ id: number }>()
);
export const getGroupsSuccess = createAction('[Mission] Get Groups Success',
  props<{ groups: Group[] }>()
);
export const getGroupsFail = createAction('[Mission] Get Groups Fail',
  props<{ error: string }>()
);

// Set Mark-as-read message Sequence
export const setMarkAsReadRequest = createAction('[Mission] Mark as Read Request',
  props<{ mission: number, message: number }>()
);
export const setMarkAsReadSuccess = createAction('[Mission] Mark as Read Success',
  props<{ message: number }>()
);
export const setMarkAsReadFail = createAction('[Mission] Mark as Read Fail',
  props<{ error: string }>()
);

export const setSelectedMission = createAction('[Mission] Set Selected Mission',
  props<{ id: number }>()
);

// Navigation
export const redirectMissionPage = createAction('[Mission] Redirect Mission Page',
  props<{ id: number }>()
);
