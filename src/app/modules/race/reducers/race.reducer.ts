import { ProcessInterface } from '../../core/interfaces/process.interface';
import { ProcessStatus } from '../../core/enums/process-status.enum';
import { createReducer, on } from '@ngrx/store';
import { Race } from '../models/race.model';
import { RaceActions } from '../actions';

export interface RaceState {
  list: Race[];
  process: ProcessInterface;
}

export const initialState: RaceState = {
  list: null,
  process: {
    error: null,
    entity: null,
    action: null,
    status: ProcessStatus.Normal
  }
};

export const reducer = createReducer(
  initialState,
  /*on(AuthActions.checkSessionRequest, (state) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }})
  )*/
);
