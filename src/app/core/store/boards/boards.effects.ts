// src/app/core/store/boards/boards.effects.ts
import { Injectable, inject }            from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of }                            from 'rxjs';
import { HotToastService }               from '@ngxpert/hot-toast';

import * as BoardsActions                from './boards.actions';
import { BoardsService }                 from '../../services/boards.service';

@Injectable()
export class BoardsEffects {
  private actions$      = inject(Actions);
  private boardsService = inject(BoardsService);
  private toast         = inject(HotToastService);

  // Load Boards
  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.loadBoards),
      mergeMap(({ projectId }) =>
        this.boardsService.list(projectId).pipe(
          map(boards => BoardsActions.loadBoardsSuccess({ boards })),
          catchError(error => of(BoardsActions.loadBoardsFailure({ error })))
        )
      )
    )
  );

  // Create Board
  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.createBoard),
      mergeMap(({ projectId, board }) =>
        this.boardsService.create(projectId, board).pipe(
          map(created => BoardsActions.createBoardSuccess({ board: created })),
          tap(() => this.toast.success('Board created successfully')),
          catchError(error => {
            this.toast.error('Failed to create board');
            return of(BoardsActions.createBoardFailure({ error }));
          })
        )
      )
    )
  );

  // Update Board
  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.updateBoard),
      mergeMap(({ id, changes }) =>
        this.boardsService.update(id, changes).pipe(
          map(updated => BoardsActions.updateBoardSuccess({ board: updated })),
          tap(() => this.toast.success('Board updated successfully')),
          catchError(error => {
            this.toast.error('Failed to update board');
            return of(BoardsActions.updateBoardFailure({ error }));
          })
        )
      )
    )
  );

  // Delete Board
  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.deleteBoard),
      mergeMap(({ id }) =>
        this.boardsService.delete(id).pipe(
          map(() => BoardsActions.deleteBoardSuccess({ id })),
          tap(() => this.toast.success('Board deleted successfully')),
          catchError(error => {
            this.toast.error('Failed to delete board');
            return of(BoardsActions.deleteBoardFailure({ error }));
          })
        )
      ) 
    )
  );
}
