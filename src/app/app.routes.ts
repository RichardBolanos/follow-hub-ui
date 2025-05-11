import { Routes } from '@angular/router';
import { authGuard }              from './core/guards/auth.guard';
import { roleGuard }              from './core/guards/role.guard';
import { MainLayoutComponent }    from './core/layouts/main-layout.component';

export const routes: Routes = [
  // Redirigimos '' a 'projects' para que el guard compruebe el token:
  { path: '', pathMatch: 'full', redirectTo: 'projects' },

  // Rutas públicas
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./shared/pages/forbidden/forbidden.component').then(m => m.ForbiddenComponent)
  },

  // Rutas protegidas bajo MainLayout
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('./features/projects/projects.routes').then(m => m.routes)
      },
      {
        path: 'boards',
        loadChildren: () =>
          import('./features/boards/boards.routes').then(m => m.routes)
      }
      // …más children según tus fases
    ]
  },
  { path: '**', redirectTo: '' }
];
