import { ProcessInterface } from '../../core/interfaces/process.interface';
import { ProcessStatus } from '../../core/enums/process-status.enum';
import { createReducer, on } from '@ngrx/store';
import { Mission } from '../models/mission.model';
import { MissionActions } from '../actions';
import { Participant } from '../models/participant.model';
import { Message } from '../models/message.model';
import { Group } from '../models/group.model';

export interface MissionState {
  list: Mission[];
  participants: Participant[];
  messages: Message[];
  groups: Group[];
  selected: number;
  process: ProcessInterface;
}

export const initialState: MissionState = {
  list: [],
  participants: [],
  messages: [],
  groups: [],
  selected: null,
  process: {
    error: null,
    entity: null,
    action: null,
    status: ProcessStatus.Normal
  }
};

export const reducer = createReducer(
  initialState,
  on(MissionActions.getMissionsRequest, (state) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }
  })),
  on(MissionActions.getMissionsSuccess, (state, { missions }) => ({
    ...initialState, list: missions, process : {
      ...initialState.process, status: ProcessStatus.Completed
    }
  })),
  on(MissionActions.setSelectedMission, (state, { id }) => ({
    ...state, selected: id
  })),
  on(MissionActions.getParticipantsRequest, (state, { id }) => ({
    ...state, participants: [], process : {
      ...state.process, status: ProcessStatus.Processing
    }
  })),
  on(MissionActions.getParticipantsSuccess, (state, { participants }) => ({
    ...state, participants, process : {
      ...state.process, status: ProcessStatus.Completed
    }
  })),
  on(MissionActions.getMessagesRequest, (state, { id }) => ({
    ...state, messages: [], process : {
      ...state.process, status: ProcessStatus.Processing
    }
  })),
  on(MissionActions.getMessagesSuccess, (state, { messages }) => ({
    ...state, messages, process : {
      ...state.process, status: ProcessStatus.Completed
    }
  })),
  on(MissionActions.getGroupsRequest, (state, { id }) => ({
    ...state, messages: [], process : {
      ...state.process, status: ProcessStatus.Processing
    }
  })),
  on(MissionActions.getGroupsSuccess, (state, { groups }) => ({
    ...state, groups, process : {
      ...state.process, status: ProcessStatus.Completed
    }
  })),
  on(MissionActions.setMarkAsReadRequest, (state, { mission, message }) => ({
    ...state, process : {
      ...state.process, status: ProcessStatus.Processing
    }
  })),
  on(MissionActions.setMarkAsReadSuccess, (state, { message }) => {
    const messages = state.messages.map(m => m.id === message ? { ...m, read: 1 } : m );
    return {
      ...state, messages, process : {
        ...state.process, status: ProcessStatus.Completed
      }
    };
  })
);
