import { createFeature, createReducer, on } from '@ngrx/store';
import * as ProjectsActions               from './projects.actions';
import { ProjectDto }                     from '../../services/projects.service';

export interface ProjectsState {
  projects: ProjectDto[];
  loading: boolean;
  error: any | null;
}

export const initialProjectsState: ProjectsState = {
  projects: [],
  loading: false,
  error: null
};

export const projectsFeature = createFeature({
  name: 'projects',
  reducer: createReducer(
    initialProjectsState,

    // Load
    on(ProjectsActions.loadProjects, state => ({ ...state, loading: true,  error: null })),
    on(ProjectsActions.loadProjectsSuccess, (state, { projects }) => ({
      ...state,
      loading: false,
      projects
    })),
    on(ProjectsActions.loadProjectsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    // Create
    on(ProjectsActions.createProject, state => ({ ...state, loading: true,  error: null })),
    on(ProjectsActions.createProjectSuccess, (state, { project }) => ({
      ...state,
      loading: false,
      projects: [project, ...state.projects]
    })),
    on(ProjectsActions.createProjectFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    // Update
    on(ProjectsActions.updateProject, state => ({ ...state, loading: true,  error: null })),
    on(ProjectsActions.updateProjectSuccess, (state, { project }) => ({
      ...state,
      loading: false,
      projects: state.projects.map(p => p.id === project.id ? project : p)
    })),
    on(ProjectsActions.updateProjectFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    // Delete
    on(ProjectsActions.deleteProject, state => ({ ...state, loading: true,  error: null })),
    on(ProjectsActions.deleteProjectSuccess, (state, { id }) => ({
      ...state,
      loading: false,
      projects: state.projects.filter(p => p.id !== id)
    })),
    on(ProjectsActions.deleteProjectFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))
  )
});

export const projectsReducer = projectsFeature.reducer;

// Selectors
export const {
  selectProjectsState,
  selectProjects,
  selectLoading,
  selectError
} = projectsFeature;

export const selectAllProjects      = selectProjects;
export const selectProjectsLoading  = selectLoading;
export const selectProjectsError    = selectError;
