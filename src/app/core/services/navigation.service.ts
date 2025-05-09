import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

export interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  roles?: string[];
}

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly auth = inject(AuthService);

  private readonly allItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'home' },
    { label: 'Proyectos', route: '/projects', icon: 'folder' },
    { label: 'Tableros', route: '/boards', icon: 'grid' },
    { label: 'Notificaciones', route: '/notifications', icon: 'bell' },
    { label: 'Usuarios', route: '/users', icon: 'users', roles: ['Admin'] }
  ];

  /** Filtra items según autenticación y roles */
  getMenuItems(): MenuItem[] {
    if (!this.auth.isAuthenticated()) return [];
    return this.allItems.filter(item =>
      !item.roles || this.auth.getRoles().some(r => item.roles!.includes(r))
    );
  }

  /** Logout del usuario */
  logout(): void {
    this.auth.logout();
  }
}
