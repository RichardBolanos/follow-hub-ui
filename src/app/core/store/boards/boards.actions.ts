import { createAction, props } from '@ngrx/store';
import {
  BoardDto,
  CreateBoardRequest,
  UpdateBoardRequest
} from '../../models/board.model';

// Load Boards
export const loadBoards = createAction(
  '[Boards] Load Boards',
  props<{ projectId: number }>()
);
export const loadBoardsSuccess = createAction(
  '[Boards] Load Boards Success',
  props<{ boards: BoardDto[] }>()
);
export const loadBoardsFailure = createAction(
  '[Boards] Load Boards Failure',
  props<{ error: any }>()
);

// Create Board
export const createBoard = createAction(
  '[Boards] Create Board',
  props<{ projectId: number; board: CreateBoardRequest }>()
);
export const createBoardSuccess = createAction(
  '[Boards] Create Board Success',
  props<{ board: BoardDto }>()
);
export const createBoardFailure = createAction(
  '[Boards] Create Board Failure',
  props<{ error: any }>()
);

// Update Board
export const updateBoard = createAction(
  '[Boards] Update Board',
  props<{ id: number; changes: UpdateBoardRequest }>()
);
export const updateBoardSuccess = createAction(
  '[Boards] Update Board Success',
  props<{ board: BoardDto }>()
);
export const updateBoardFailure = createAction(
  '[Boards] Update Board Failure',
  props<{ error: any }>()
);

// Delete Board
export const deleteBoard = createAction(
  '[Boards] Delete Board',
  props<{ id: number }>()
);
export const deleteBoardSuccess = createAction(
  '[Boards] Delete Board Success',
  props<{ id: number }>()
);
export const deleteBoardFailure = createAction(
  '[Boards] Delete Board Failure',
  props<{ error: any }>()
);
