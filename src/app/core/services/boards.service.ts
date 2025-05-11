// src/app/core/services/boards.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable }         from 'rxjs';
import { BoardDto, CreateBoardRequest, UpdateBoardRequest } from '../models/board.model';

@Injectable({ providedIn: 'root' })
export class BoardsService {
  private readonly http    = inject(HttpClient);
  private readonly baseUrl = '/api/Boards';

  /** Lista todos los tableros de un proyecto */
  list(projectId: number): Observable<BoardDto[]> {
    return this.http.get<BoardDto[]>(`${this.baseUrl}/${projectId}`);
  }

  /** Crea un tablero dentro de un proyecto */
  create(projectId: number, payload: CreateBoardRequest): Observable<BoardDto> {
    return this.http.post<BoardDto>(`${this.baseUrl}/${projectId}`, payload);
  }

  /** Actualiza un tablero por su id */
  update(id: number, payload: UpdateBoardRequest): Observable<BoardDto> {
    return this.http.put<BoardDto>(`${this.baseUrl}/${id}`, payload);
  }

  /** Elimina un tablero por su id */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
