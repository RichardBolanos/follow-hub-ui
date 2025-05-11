import { createFeature, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  roles: string[];
  loading: boolean;
  error: any | null;
}

export const initialAuthState: AuthState = {
  token: null,
  roles: [],
  loading: false,
  error: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,

    // Register
    on(AuthActions.register, state => ({
      ...state,
      loading: true,
      error: null
    })),
    on(AuthActions.registerSuccess, state => ({
      ...state,
      loading: false
    })),
    on(AuthActions.registerFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    // Login
    on(AuthActions.login, state => ({
      ...state,
      loading: true,
      error: null
    })),
    on(AuthActions.loginSuccess, (state, { token, roles }) => ({
      ...state,
      token,
      roles,
      loading: false
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    // Logout
    on(AuthActions.logout, () => initialAuthState)
  )
});

export const authReducer = authFeature.reducer;

// Selectores automáticos
export const {
  selectAuthState,
  selectToken,
  selectRoles,
  selectLoading,
  selectError
} = authFeature;
