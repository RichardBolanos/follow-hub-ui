// src/app/core/store/projects/projects.effects.ts
import { Injectable, inject }            from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of }                            from 'rxjs';
import { HotToastService }               from '@ngxpert/hot-toast';

import * as ProjectsActions              from './projects.actions';
import { ProjectsService }               from '../../services/projects.service';

@Injectable()
export class ProjectsEffects {
  private actions$        = inject(Actions);
  private projectsService = inject(ProjectsService);
  private toast           = inject(HotToastService);

  // Load Projects
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.loadProjects),
      mergeMap(({ limit, cursor, name }) =>
        this.projectsService.list({ limit, cursor, name }).pipe(
          map(projects => ProjectsActions.loadProjectsSuccess({ projects })),
          catchError(error => of(ProjectsActions.loadProjectsFailure({ error })))
        )
      )
    )
  );

  // Create Project
  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.createProject),
      mergeMap(({ project }) =>
        this.projectsService.create(project).pipe(
          map(created => ProjectsActions.createProjectSuccess({ project: created })),
          tap(() => this.toast.success('Project created successfully')),
          catchError(error => {
            this.toast.error('Failed to create project');
            return of(ProjectsActions.createProjectFailure({ error }));
          })
        )
      )
    )
  );

  // Update Project
  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.updateProject),
      mergeMap(({ id, changes }) =>
        this.projectsService.update(id, changes).pipe(
          map(updated => ProjectsActions.updateProjectSuccess({ project: updated })),
          tap(() => this.toast.success('Project updated successfully')),
          catchError(error => {
            this.toast.error('Failed to update project');
            return of(ProjectsActions.updateProjectFailure({ error }));
          })
        )
      )
    )
  );

  // Delete Project
  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.deleteProject),
      mergeMap(({ id }) =>
        this.projectsService.delete(id).pipe(
          map(() => ProjectsActions.deleteProjectSuccess({ id })),
          tap(() => this.toast.success('Project deleted successfully')),
          catchError(error => {
            this.toast.error('Failed to delete project');
            return of(ProjectsActions.deleteProjectFailure({ error }));
          })
        )
      )
    )
  );
}
