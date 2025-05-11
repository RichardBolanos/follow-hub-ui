import { inject, PLATFORM_ID }             from '@angular/core';
import { CanActivateFn, Router, UrlTree }  from '@angular/router';
import { isPlatformBrowser }               from '@angular/common';
import { Store }                           from '@ngrx/store';
import { authFeature }                     from '../store/auth/auth.feature';
import { map, take }                       from 'rxjs/operators';
import { Observable }                      from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
): boolean | UrlTree | Observable<boolean | UrlTree> => {
  // Durante SSR permitimos siempre navegar
  if (!isPlatformBrowser(inject(PLATFORM_ID))) {
    return true;
  }

  const store  = inject(Store);
  const router = inject(Router);

  return store.select(authFeature.selectToken).pipe(
    take(1),
    map(token =>
      token
        ? true
        : router.createUrlTree(
            ['/login'],
            { queryParams: { returnUrl: state.url } }
          )
    )
  );
};
