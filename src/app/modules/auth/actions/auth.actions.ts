import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { Credentials } from '../models/credentials.model';

// Check sequence
export const checkSessionRequest = createAction('[Auth] Check Session Request');
export const checkSessionSuccess = createAction('[Auth] Check Session Success',
  props<{ user: User }>()
);
export const checkSessionFail = createAction('[Auth] Check Session Fail');

// Login sequence
export const loginRequest = createAction('[Auth] Login Request',
  props<{ credentials: Credentials }>()
);
export const loginSuccess = createAction('[Auth] Login Success',
  props<{ user: User }>()
);
export const loginFail = createAction('[Auth] Login Fail',
  props<{ error: string }>()
);

// Update Selected Character of account
export const updateSelectedCharacter = createAction('[Auth] Update Selected Character',
  props<{ user: User }>()
);

// Logout Sequence
export const logoutRequest = createAction('[Auth] Logout Request');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFail = createAction('[Auth] Logout Fail');

// Redirects
export const loginRedirect = createAction('[Auth] Login Redirect');
export const authedRedirect = createAction('[Auth] Authed Redirect');

