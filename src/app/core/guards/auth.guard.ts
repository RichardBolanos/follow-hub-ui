// src/app/core/guards/auth.guard.ts (o donde lo tengas)
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Si no estamos en browser, evitamos bloquear la compilación SSR
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  return auth.isAuthenticated()
    ? true
    : router.parseUrl('/login');
};
