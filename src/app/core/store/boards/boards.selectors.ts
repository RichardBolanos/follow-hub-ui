import { boardsFeature } from './boards.feature';

export const {
  selectBoardsState,
  selectBoards,
  selectLoading,
  selectError
} = boardsFeature;

export const selectAllBoards       = selectBoards;
export const selectBoardsLoading   = selectLoading;
export const selectBoardsError     = selectError;
