import { Component, OnInit, inject }                              from '@angular/core';
import { CommonModule }                                            from '@angular/common';
import { RouterModule, Router }                                    from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store }                                                   from '@ngrx/store';
import { Observable }                                              from 'rxjs';

import {
  loadProjects,
  createProject,
  updateProject,
  deleteProject
} from '../../../core/store/projects/projects.actions';
import {
  selectAllProjects,
  selectProjectsLoading,
  selectProjectsError
} from '../../../core/store/projects/projects.selectors';
import {
  ProjectDto,
  CreateProjectRequest,
  UpdateProjectRequest
} from '../../../core/services/projects.service';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly store  = inject(Store);

  projects$: Observable<ProjectDto[]>   = this.store.select(selectAllProjects);
  loading$:  Observable<boolean>        = this.store.select(selectProjectsLoading);
  error$:    Observable<string | null>  = this.store.select(selectProjectsError);

  isEditMode        = false;
  editingProject: ProjectDto | null = null;
  showModal         = false;

  projectForm = new FormGroup({
    name:        new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    isPublic:    new FormControl<boolean>(false)
  });

  ngOnInit(): void {
    this.store.dispatch(loadProjects({}));
  }

  openCreate(): void {
    this.isEditMode = false;
    this.editingProject = null;
    this.projectForm.reset({ name: '', description: '', isPublic: false });
    this.showModal = true;
  }

  openEdit(project: ProjectDto): void {
    this.isEditMode = true;
    this.editingProject = project;
    this.projectForm.setValue({
      name:        project.name ?? '',
      description: project.description ?? '',
      isPublic:    project.isPublic
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  submitForm(): void {
    if (this.projectForm.invalid) return;

    const { name, description, isPublic } = this.projectForm.value as {
      name: string;
      description: string;
      isPublic: boolean;
    };

    if (this.isEditMode && this.editingProject) {
      this.store.dispatch(updateProject({
        id: this.editingProject.id,
        changes: { name, description, isPublic } as UpdateProjectRequest
      }));
    } else {
      this.store.dispatch(createProject({
        project: { name, description, isPublic } as CreateProjectRequest
      }));
    }

    this.closeModal();
  }

  deleteProjectClick(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este proyecto?')) {
      this.store.dispatch(deleteProject({ id }));
    }
  }

  goToBoards(id: number): void {
    this.router.navigate(['/projects', id, 'boards']);
  }
}
