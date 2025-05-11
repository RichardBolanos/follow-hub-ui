import { Injectable, inject }       from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router }                     from '@angular/router';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of }                        from 'rxjs';

import { AuthService }               from '../../services/auth.service';
import { HotToastService }           from '@ngxpert/hot-toast';
import * as AuthActions              from './auth.actions';

@Injectable()
export class AuthEffects {
  // Usamos inject() para asegurar que actions$ siempre esté definido
  private readonly actions$     = inject(Actions);
  private readonly authService  = inject(AuthService);
  private readonly router       = inject(Router);
  private readonly toast        = inject(HotToastService);

  /** Efecto para Register */
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ email, password }) =>
        this.authService.registerApi(email, password).pipe(
          map(() => {
            this.toast.success('Registro exitoso. Por favor inicia sesión.');
            return AuthActions.registerSuccess();
          }),
          catchError(error => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  /** Efecto para Login */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.loginApi(email, password).pipe(
          map(({ token, roles }) => {
            this.authService.login(token, roles);
            this.router.navigate(['/dashboard']);
            return AuthActions.loginSuccess({ token, roles });
          }),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  /** Efecto para Logout */
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
