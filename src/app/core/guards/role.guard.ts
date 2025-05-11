import { inject }                                      from '@angular/core';
import {
  CanActivateFn,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store }                                       from '@ngrx/store';
import { authFeature }                                 from '../store/auth/auth.feature';
import { map, take }                                   from 'rxjs/operators';
import { Observable }                                  from 'rxjs';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree | Observable<boolean | UrlTree> => {
  const allowedRoles = (route.data['roles'] as string[]) ?? [];
  const store        = inject(Store);
  const router       = inject(Router);

  return store.select(authFeature.selectRoles).pipe(
    take(1),
    map(userRoles =>
      allowedRoles.some(r => userRoles.includes(r))
        ? true
        : router.createUrlTree(['/forbidden'])
    )
  );
};
