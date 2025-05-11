import { createAction, props } from '@ngrx/store';

// Registro (no retorna token)
export const register = createAction(
  '[Auth] Register',
  props<{ email: string; password: string }>()
);
export const registerSuccess = createAction('[Auth] Register Success');
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);

// Login (retorna token + roles)
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

// Logout
export const logout = createAction('[Auth] Logout');
