import { createAction, props } from '@ngrx/store';
import {
  ProjectDto,
  CreateProjectRequest,
  UpdateProjectRequest
} from '../../services/projects.service';

// Load Projects
export const loadProjects = createAction(
  '[Projects] Load Projects',
  props<{ limit?: number; cursor?: string; name?: string }>()
);
export const loadProjectsSuccess = createAction(
  '[Projects] Load Projects Success',
  props<{ projects: ProjectDto[] }>()
);
export const loadProjectsFailure = createAction(
  '[Projects] Load Projects Failure',
  props<{ error: any }>()
);

// Create Project
export const createProject = createAction(
  '[Projects] Create Project',
  props<{ project: CreateProjectRequest }>()
);
export const createProjectSuccess = createAction(
  '[Projects] Create Project Success',
  props<{ project: ProjectDto }>()
);
export const createProjectFailure = createAction(
  '[Projects] Create Project Failure',
  props<{ error: any }>()
);

// Update Project
export const updateProject = createAction(
  '[Projects] Update Project',
  props<{ id: number; changes: UpdateProjectRequest }>()
);
export const updateProjectSuccess = createAction(
  '[Projects] Update Project Success',
  props<{ project: ProjectDto }>()
);
export const updateProjectFailure = createAction(
  '[Projects] Update Project Failure',
  props<{ error: any }>()
);

// Delete Project
export const deleteProject = createAction(
  '[Projects] Delete Project',
  props<{ id: number }>()
);
export const deleteProjectSuccess = createAction(
  '[Projects] Delete Project Success',
  props<{ id: number }>()
);
export const deleteProjectFailure = createAction(
  '[Projects] Delete Project Failure',
  props<{ error: any }>()
);
