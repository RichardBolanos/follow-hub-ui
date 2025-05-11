// src/app/features/boards/boards.routes.ts
import { Routes } from '@angular/router';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { authGuard }           from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: BoardsListComponent,
    canActivate: [authGuard],
    data: { animation: 'BoardsPage' }
  }
];
