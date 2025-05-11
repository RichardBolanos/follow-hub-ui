// src/app/core/models/board.model.ts
export interface BoardDto {
  id: number;
  projectId: number;
  name: string;
  order?: number;
}

export interface CreateBoardRequest {
  name: string;
  order?: number;
}

export type UpdateBoardRequest = CreateBoardRequest;
