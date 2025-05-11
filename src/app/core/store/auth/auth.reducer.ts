import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  roles: string[];
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  token: null,
  roles: [],
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.register,         state => ({ ...state, loading: true,  error: null })),
  on(AuthActions.registerSuccess,  state => ({ ...state, loading: false           })),
  on(AuthActions.registerFailure,  (state, { error }) => ({ ...state, loading: false, error })),

  on(AuthActions.login,            state => ({ ...state, loading: true,  error: null })),
  on(AuthActions.loginSuccess,     (state, { token, roles }) => ({
                                     ...state,
                                     token,
                                     roles,
                                     loading: false
                                   })),
  on(AuthActions.loginFailure,     (state, { error }) => ({ ...state, loading: false, error })),

  on(AuthActions.logout,           () => initialState)
);
