import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule }                         from '@angular/common';
import { RouterModule, Router }                 from '@angular/router';
import { ReactiveFormsModule, FormControl }     from '@angular/forms';
import { Subject }                              from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Store }                                from '@ngrx/store';
import { Observable }                           from 'rxjs';

import { loadProjects }                         from '../../core/store/projects/projects.actions';
import {
  selectAllProjects,
  selectProjectsLoading,
  selectProjectsError
} from '../../core/store/projects/projects.selectors';
import { ProjectDto }                           from '../../core/models/project.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly store    = inject(Store);
  private readonly router   = inject(Router);
  private readonly destroy$ = new Subject<void>();

  projects$: Observable<ProjectDto[]>    = this.store.select(selectAllProjects);
  loading$:  Observable<boolean>         = this.store.select(selectProjectsLoading);
  error$:    Observable<string | null>   = this.store.select(selectProjectsError);

  filterControl = new FormControl<string>('');
  
  // Ahora público para uso en plantilla
  limit = 10;
  private cursor?: string;

  ngOnInit(): void {
    // React on filter changes
    this.filterControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        const name = value ?? '';
        this.cursor = undefined;
        this.store.dispatch(loadProjects({
          limit: this.limit,
          cursor: this.cursor,
          name
        }));
      });

    // Update cursor from last project ID
    this.projects$
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => {
        if (list.length) {
          this.cursor = String((list[list.length - 1] as any).id);
        }
      });

    // Initial load with empty filter
    this.store.dispatch(loadProjects({
      limit: this.limit,
      cursor: this.cursor,
      name: ''
    }));
  }

  loadMore(): void {
    const name = this.filterControl.value ?? '';
    this.store.dispatch(loadProjects({
      limit: this.limit,
      cursor: this.cursor,
      name
    }));
  }

  goToBoards(project: ProjectDto): void {
    this.router.navigate(['/projects', project.id, 'boards']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
