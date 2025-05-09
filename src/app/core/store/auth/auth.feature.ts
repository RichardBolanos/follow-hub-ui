import { createFeature, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  roles: string[];
  error: any | null;
}

export const initialAuthState: AuthState = {
  token: null,
  roles: [],
  error: null
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(AuthActions.loginSuccess, (state, { token, roles }) => ({
      ...state,
      token,
      roles,
      error: null
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(AuthActions.registerSuccess, (state, { token, roles }) => ({
      ...state,
      token,
      roles,
      error: null
    })),
    on(AuthActions.registerFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(AuthActions.logout, () => initialAuthState),
    on(AuthActions.loadUserFromTokenSuccess, (state, { roles }) => ({
      ...state,
      roles
    })),
    on(AuthActions.loadUserFromTokenFailure, state => ({
      ...initialAuthState
    }))
  )
});
