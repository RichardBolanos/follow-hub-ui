import { createFeature, createReducer, on } from '@ngrx/store';
import * as BoardsActions from './boards.actions';
import { BoardDto } from '../../models/board.model';

export interface BoardsState {
  boards: BoardDto[];
  loading: boolean;
  error: any | null;
}

export const initialBoardsState: BoardsState = {
  boards: [],
  loading: false,
  error: null
};

export const boardsFeature = createFeature({
  name: 'boards',
  reducer: createReducer(
    initialBoardsState,

    // Load
    on(BoardsActions.loadBoards, state => ({ ...state, loading: true,  error: null })),
    on(BoardsActions.loadBoardsSuccess, (state, { boards }) => ({
      ...state,
      loading: false,
      boards
    })),
    on(BoardsActions.loadBoardsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    // Create
    on(BoardsActions.createBoard, state => ({ ...state, loading: true,  error: null })),
    on(BoardsActions.createBoardSuccess, (state, { board }) => ({
      ...state,
      loading: false,
      boards: [board, ...state.boards]
    })),
    on(BoardsActions.createBoardFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    // Update
    on(BoardsActions.updateBoard, state => ({ ...state, loading: true,  error: null })),
    on(BoardsActions.updateBoardSuccess, (state, { board }) => ({
      ...state,
      loading: false,
      boards: state.boards.map(b => b.id === board.id ? board : b)
    })),
    on(BoardsActions.updateBoardFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    // Delete
    on(BoardsActions.deleteBoard, state => ({ ...state, loading: true,  error: null })),
    on(BoardsActions.deleteBoardSuccess, (state, { id }) => ({
      ...state,
      loading: false,
      boards: state.boards.filter(b => b.id !== id)
    })),
    on(BoardsActions.deleteBoardFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))
  )
});

export const boardsReducer = boardsFeature.reducer;

// Selectors
export const {
  selectBoardsState,
  selectBoards,
  selectLoading,
  selectError
} = boardsFeature;

export const selectAllBoards     = selectBoards;
export const selectBoardsLoading = selectLoading;
export const selectBoardsError   = selectError;
