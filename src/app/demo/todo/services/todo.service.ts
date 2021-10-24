import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { Todo } from '../models/todo.model';

const TODO_LIST: string = 'todos';

@Injectable()
export class TodoService {

  private todos: Todo[];
  private storage: Storage = sessionStorage;

  constructor(
    private readonly session: SessionService,
  ) { }

  findAll(): Todo[] {
    const todoValue: string = this.storage.getItem(TODO_LIST) as string;
    try {
      const todos: Todo[] = todoValue ? JSON.parse(todoValue) : [{
        id: 1,
        name: 'Makan',
        isDone: true
      }];
      return this.todos = todos;
    } catch (error) {
      console.log(error);
    }
  }

  findById(id: number): Todo {
    const todoValue: string = this.storage.getItem(TODO_LIST) as string;
    try {
      const todos: Todo[] = todoValue ? JSON.parse(todoValue) : [];
      const todo: Todo = todos.find(todo => todo.id === id);
      return todo;
    } catch (error) {
      console.log(error);
    }
  }

}
