import { ProcessInterface } from '../../core/interfaces/process.interface';
import { ProcessStatus } from '../../core/enums/process-status.enum';
import { createReducer, on } from '@ngrx/store';
import { Rank } from '../models/rank.model';
import { RankActions } from '../actions';

export interface RankState {
  list: Rank[];
  process: ProcessInterface;
}

export const initialState: RankState = {
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
  on(RankActions.getRanksRequest, (state) => ({
    ...state, process: {
      ...initialState.process, status: ProcessStatus.Processing
    }
  })),
  on(RankActions.getRanksSuccess, (state, { ranks }) => ({
    ...initialState, list: ranks, process : {
      ...initialState.process, status: ProcessStatus.Completed
    }
  })),
);
