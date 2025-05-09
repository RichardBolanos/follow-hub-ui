// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { StoreModule, MetaReducer, ActionReducer, Action } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { localStorageSync } from 'ngrx-store-localstorage';

import { routes } from './app.routes';
import { authFeature } from './core/store/auth/auth.feature';
import { AuthEffects } from './core/store/auth/auth.effects';
import { environment } from '../environments/environment';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

/**
 * Sólo sincroniza el slice 'auth' con localStorage
 * cuando se ejecuta en navegador. Durante SSR usa el reducer sin cambios.
 */
export function localStorageSyncReducer(
  reducer: ActionReducer<any, Action>
): ActionReducer<any, Action> {
  return typeof window !== 'undefined'
    ? localStorageSync({ keys: ['auth'], rehydrate: true })(reducer)
    : reducer;
}

export const metaReducers: MetaReducer<any>[] = [
  localStorageSyncReducer
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),

    importProvidersFrom(
      // Configuración del store raíz con router y feature 'auth'
      StoreModule.forRoot(
        {
          router: routerReducer,
          auth: authFeature.reducer
        },
        { metaReducers }
      ),

      // Efectos globales
      EffectsModule.forRoot([AuthEffects]),

      // Sincroniza el Router con el store
      StoreRouterConnectingModule.forRoot(),

      // DevTools de Redux (solo en desarrollo)
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production
      })
    ), provideHotToastConfig()
  ]
};
