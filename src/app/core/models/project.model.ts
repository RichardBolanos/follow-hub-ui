// src/app/core/models/project.model.ts
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
  