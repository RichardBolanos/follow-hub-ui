import { projectsFeature } from './projects.feature';

export const {
  // selector del estado completo
  selectProjectsState,

  // selectores de cada campo en ProjectsState
  selectProjects,
  selectLoading,
  selectError
} = projectsFeature;

// alias más descriptivos para usar en UI
export const selectAllProjects       = selectProjects;
export const selectProjectsLoading  = selectLoading;
export const selectProjectsError    = selectError;
