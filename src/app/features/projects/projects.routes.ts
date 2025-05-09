// Antes: import { ProjectsListComponent } from './projects-list.component';
import { Routes } from '@angular/router';
import { ProjectsListComponent } from './projects-list/projects-list.component';

export const routes: Routes = [
  { path: '', component: ProjectsListComponent }
];
