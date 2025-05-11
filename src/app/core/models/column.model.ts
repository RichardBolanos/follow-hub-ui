// src/app/core/models/column.model.ts
export interface ColumnDto {
    id: number;
    boardId: number;
    name: string | null;
    order: number;
  }
  
  export interface CreateColumnRequest {
    boardId: number;
    name: string;
    order?: number;
  }
  
  export interface UpdateColumnRequest extends CreateColumnRequest {}
  