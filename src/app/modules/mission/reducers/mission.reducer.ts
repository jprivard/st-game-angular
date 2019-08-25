import { ProcessInterface } from '../../core/interfaces/process.interface';
import { ProcessStatus } from '../../core/enums/process-status.enum';
import { createReducer, on } from '@ngrx/store';
import { Mission } from '../models/mission.model';
import { MissionActions } from '../actions';

export interface MissionState {
  list: Mission[];
  selected: number;
  process: ProcessInterface;
}

export const initialState: MissionState = {
  list: null,
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
);
