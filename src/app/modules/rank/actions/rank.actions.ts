import { createAction, props } from '@ngrx/store';
import { Rank } from '../models/rank.model';

// Get Characters sequence
export const getRanksRequest = createAction('[Rank] Get Ranks Request');
export const getRanksSuccess = createAction('[Rank] Get Ranks Success',
  props<{ ranks: Rank[] }>()
);
export const getRanksFail = createAction('[Rank] Get Ranks Fail',
  props<{ error: string }>()
);
