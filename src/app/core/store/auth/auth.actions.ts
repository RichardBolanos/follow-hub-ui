import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; roles: string[] }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ email: string; password: string }>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ token: string; roles: string[] }>()
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

export const loadUserFromToken = createAction('[Auth] Load User From Token');
export const loadUserFromTokenSuccess = createAction(
  '[Auth] Load User From Token Success',
  props<{ roles: string[] }>()
);
export const loadUserFromTokenFailure = createAction(
  '[Auth] Load User From Token Failure'
);
