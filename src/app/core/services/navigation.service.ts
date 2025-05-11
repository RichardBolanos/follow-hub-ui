// src/app/core/services/navigation.service.ts
import { Injectable, inject } from '@angular/core';
import { AuthService }       from './auth.service';

export interface MenuItem {
  label: string;
  route: string;
  icon?: string;
  roles?: string[];
}

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly auth = inject(AuthService);

  private readonly allItems: MenuItem[] = [
    { label: 'Dashboard',     route: '/dashboard',     icon: 'i-heroicons-home-solid'     },
    { label: 'Proyectos',     route: '/projects',      icon: 'i-heroicons-folder-solid'   },
    { label: 'Tableros',      route: '/boards',        icon: 'i-heroicons-collection'     },
    { label: 'Notificaciones', route: '/notifications', icon: 'i-heroicons-bell-solid'     },
    { label: 'Usuarios',      route: '/users',         icon: 'i-heroicons-user-group', roles: ['Admin'] }
  ];

  /**
   * Devuelve sólo los ítems para los que el usuario está autenticado
   * y, de haber roles definidos, sólo si coincide alguno.
   */
  getMenuItems(): MenuItem[] {
    if (!this.auth.isAuthenticated()) {
      return [];
    }
    const userRoles = this.auth.getRoles();
    return this.allItems.filter(item =>
      !item.roles || item.roles.some(role => userRoles.includes(role))
    );
  }
}
