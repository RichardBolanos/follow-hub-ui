// src/app/core/store/auth/auth.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  // ‣ Usamos inject() en vez de constructor para asegurarnos
  //   de que `actions$` esté siempre disponible :contentReference[oaicite:0]{index=0}
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        this.authService.loginApi(email, password).pipe(
          // Persistir token/roles antes de despachar el éxito
          tap(response => {
            this.authService.login(response.token, response.roles);
          }),
          map(response =>
            AuthActions.loginSuccess({
              token: response.token,
              roles: response.roles
            })
          ),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ email, password }) =>
        this.authService.registerApi(email, password).pipe(
          tap(response => {
            this.authService.login(response.token, response.roles);
          }),
          map(response =>
            AuthActions.registerSuccess({
              token: response.token,
              roles: response.roles
            })
          ),
          catchError(error => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserFromToken),
      exhaustMap(() => {
        const token = this.authService.getToken();
        if (token) {
          const roles = this.authService.getRoles();
          return of(AuthActions.loadUserFromTokenSuccess({ roles }));
        } else {
          return of(AuthActions.loadUserFromTokenFailure());
        }
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.authService.logout())
      ),
    { dispatch: false }
  );
}
