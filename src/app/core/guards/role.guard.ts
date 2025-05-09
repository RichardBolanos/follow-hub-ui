import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const route = inject(ActivatedRouteSnapshot);
  const allowed = (route.data['roles'] ?? []) as string[];

  if (allowed.some((role) => auth.hasRole(role))) {
    return true;
  }

  return router.parseUrl('/forbidden');
};
