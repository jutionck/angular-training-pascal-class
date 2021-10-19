import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  ngOnInit(): void { }

  @Input() todos: Todo[] = [];
  @Output() toggleTodo: EventEmitter<void> = new EventEmitter<void>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  onCheckTodo(todo: Todo): void {
    todo.isDone = !todo.isDone;
    this.toggleTodo.emit();
  }

  onSelectTodo(todo: Todo): void {
    this.editTodo.emit(todo);
  }

  onDeleteTodo(todo: Todo): void {
    this.deleteTodo.emit(todo);
  }

}
