import { Component, OnInit, inject }                              from '@angular/core';
import { CommonModule }                                            from '@angular/common';
import { RouterModule, ActivatedRoute, Router }                    from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Store }                                                   from '@ngrx/store';
import { Observable }                                              from 'rxjs';

import {
  loadBoards,
  createBoard,
  updateBoard,
  deleteBoard
} from '../../../core/store/boards/boards.actions';
import {
  selectAllBoards,
  selectBoardsLoading,
  selectBoardsError
} from '../../../core/store/boards/boards.selectors';
import { BoardDto }                                                from '../../../core/models/board.model';

@Component({
  selector: 'app-boards-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {
  private route  = inject(ActivatedRoute);
  private router = inject(Router);
  private store  = inject(Store);

  projectId: number = 0;

  boards$:  Observable<BoardDto[]>    = this.store.select(selectAllBoards);
  loading$: Observable<boolean>       = this.store.select(selectBoardsLoading);
  error$:   Observable<string | null> = this.store.select(selectBoardsError);

  isEditMode      = false;
  editingBoard: BoardDto | null = null;
  showModal       = false;

  boardForm = new FormGroup({
    name:  new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    order: new FormControl<number>(0)
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.projectId = idParam ? +idParam : 0;
    this.store.dispatch(loadBoards({ projectId: this.projectId }));
  }

  openCreate(): void {
    this.isEditMode = false;
    this.editingBoard = null;
    this.boardForm.reset({ name: '', order: 0 });
    this.showModal = true;
  }

  openEdit(board: BoardDto): void {
    this.isEditMode = true;
    this.editingBoard = board;
    this.boardForm.setValue({ name: board.name ?? '', order: board.order ?? 0 });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  submitForm(): void {
    if (this.boardForm.invalid) return;
    const { name, order } = this.boardForm.value as { name: string; order: number };

    if (this.isEditMode && this.editingBoard) {
      this.store.dispatch(updateBoard({ id: this.editingBoard.id, changes: { name, order } }));
    } else {
      this.store.dispatch(createBoard({ projectId: this.projectId, board: { name, order } }));
    }
    this.closeModal();
  }

  deleteBoardClick(id: number): void {
    if (confirm('¿Eliminar este tablero?')) {
      this.store.dispatch(deleteBoard({ id }));
    }
  }

  goToColumns(boardId: number): void {
    this.router.navigate(['/projects', this.projectId, 'boards', boardId, 'columns']);
  }
}
