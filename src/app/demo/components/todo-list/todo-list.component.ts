import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[] = []; // one way binding -> dari parent ke child

  @Output() todo: EventEmitter<Todo> = new EventEmitter<Todo>();
  pageTitle = 'Todo List';

  // challenge
  @Output() viewTodo: EventEmitter<string> = new EventEmitter<string>(); // one way bin

  ngOnInit(): void {
  }

  // handleCheckTodo(todo: Todo): void {
  //   this.todo.emit(todo);

  //   // challenge
  //   this.viewTodo.emit(todo.isDone ? `${todo.name} (sudah selesai)` : `${todo.name} (belum selesai)`)
  // }

  handleCheckTodo(event: any, todo: Todo): void {
    console.log('id:', event.target?.value, 'isDone', event.target.checked);
    todo.isDone = event.target.checked;

    // sessionStorage
    this.todo.emit(todo);
  }

}
