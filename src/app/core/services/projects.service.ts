// src/app/core/services/projects.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProjectDto {
  id: number;
  name: string | null;
  description: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  isPublic: boolean;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  isPublic?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/Projects';

  /**
   * Lista proyectos. 
   * @param params Opcionales: limit, cursor (para paginación) y name (filtro).
   */
  list(params?: {
    limit?: number;
    cursor?: string;
    name?: string;
  }): Observable<ProjectDto[]> {
    let httpParams = new HttpParams();
    if (params?.limit != null)  httpParams = httpParams.set('limit', params.limit.toString());
    if (params?.cursor)         httpParams = httpParams.set('cursor', params.cursor);
    if (params?.name)           httpParams = httpParams.set('name', params.name);
    return this.http.get<ProjectDto[]>(this.baseUrl, { params: httpParams });
  }

  /** Obtiene un proyecto por su id */
  getById(id: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${this.baseUrl}/${id}`);
  }

  /** Crea un nuevo proyecto */
  create(payload: CreateProjectRequest): Observable<ProjectDto> {
    return this.http.post<ProjectDto>(this.baseUrl, payload);
  }

  /** Actualiza un proyecto existente */
  update(id: number, payload: UpdateProjectRequest): Observable<ProjectDto> {
    return this.http.put<ProjectDto>(`${this.baseUrl}/${id}`, payload);
  }

  /** Elimina un proyecto */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
