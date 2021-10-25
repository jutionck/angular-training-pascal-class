import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Todo } from '../../models/todo.model';
import { NewTodoService } from '../../services/new-todo.service';

@Component({
  selector: 'app-new-todo-list',
  templateUrl: './new-todo-list.component.html',
  styleUrls: ['./new-todo-list.component.scss']
})
export class NewTodoListComponent implements OnInit {

  todos: Todo[] = [];
  loading: boolean = false;
  subcriber: Observer<any>;

  constructor(
    private readonly todoService: NewTodoService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.subcriber = {
      next: (todos) => this.todos = todos,
      error: console.error,
      complete: () => this.loading = false
    }

    this.loading = true;
    this.todoService.getAll()
      .pipe(delay(1000))
      .subscribe(this.subcriber)
  }

  onCheckTodo(todo: Todo): void {
    todo.isDone = !todo.isDone;
    this.subcriber = {
      next: (todo) => console.log('todo updated'),
      error: console.error,
      complete: () => this.loading = false
    }

    this.loading = true;
    this.todoService.save(todo)
      .pipe(delay(1000))
      .subscribe(this.subcriber)
  }

  onDeleteTodo(id: number): void {
    this.subcriber = {
      next: (todo) => {
        console.log('todo deleted')
        this.todos = todo;
      },
      error: console.error,
      complete: () => this.loading = false
    }

    this.loading = true;
    this.todoService.delete(id)
      .pipe(delay(1000), switchMap(() => this.todoService.getAll()))
      .subscribe(this.subcriber)

  }

  onSelectTodo() { }
}
