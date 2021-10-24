import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlertMessage } from 'src/app/shared/models/alert-message.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnChanges {

  todos: Todo[] = [];
  message?: AlertMessage; // buat optional karena belum tentu ada

  constructor(
    private readonly session: SessionService,
    private readonly todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todos = this.todoService.findAll()
  }

  ngOnChanges(): void {
    const message: string = this.session.getFlash();
    if (message) {
      this.message = JSON.parse(message)
    }
  }

  onCheckTodo(todo: Todo): void {
    this.todoService.findById(todo.id);
  }

  onSelectTodo(todo: Todo): void {

  }

  onDeleteTodo(todo: Todo): void {
  }

}
