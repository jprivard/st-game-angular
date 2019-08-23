import { createAction, props } from '@ngrx/store';
import { Race } from '../models/race.model';

// Get Characters sequence
export const getRacesRequest = createAction('[Race] Get Races Request');
export const getRacesSuccess = createAction('[Race] Get Races Success',
  props<{ characters: Race[] }>()
);
export const getRacesFail = createAction('[Race] Get Races Fail',
  props<{ error: string }>()
);
