import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter }                         from '@angular/router';
import { provideAnimations }                     from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi
} from '@angular/common/http';

import { provideHotToastConfig }                 from '@ngxpert/hot-toast';

import { StoreModule }                           from '@ngrx/store';
import { EffectsModule }                         from '@ngrx/effects';
import { StoreDevtoolsModule }                   from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  routerReducer
} from '@ngrx/router-store';

import { HTTP_INTERCEPTORS }                     from '@angular/common/http';

import { environment } from '../environments/environment';
import { routes }      from './app.routes';

// Auth
import { authReducer }   from './core/store/auth/auth.feature';
import { AuthEffects }   from './core/store/auth/auth.effects';

// Projects
import { projectsReducer }  from './core/store/projects/projects.feature';
import { ProjectsEffects }  from './core/store/projects/projects.effects';

// Boards
import { boardsReducer }    from './core/store/boards/boards.feature';
import { BoardsEffects }    from './core/store/boards/boards.effects';

// Meta‐reducers para localStorage
import { metaReducers }     from './core/store/meta-reducers';

// Interceptor
import { AuthInterceptor }  from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Router y animaciones
    provideRouter(routes),
    provideAnimations(),

    // HTTP Client con Fetch + DI interceptors
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),

    // Hot Toast standalone
    provideHotToastConfig(),

    // NgRx Store + Effects + Router + DevTools
    importProvidersFrom(
      StoreModule.forRoot(
        {
          auth:     authReducer,
          projects: projectsReducer,
          boards:   boardsReducer,
          router:   routerReducer
        },
        { metaReducers }
      ),
      EffectsModule.forRoot([
        AuthEffects,
        ProjectsEffects,
        BoardsEffects
      ]),
      StoreRouterConnectingModule.forRoot(),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production
      })
    ),

    // Registramos el interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
