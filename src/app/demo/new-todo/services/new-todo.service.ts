import { Injectable } from "@angular/core";
import { Observable, Observer, Subject } from "rxjs";
import { Todo } from "../models/todo.model";

@Injectable()
export class NewTodoService {

  private readonly storage: Storage = sessionStorage;
  private todoSubject: Subject<boolean> = new Subject<boolean>()

  private createTodos(): Todo[] {
    const todos: Todo[] = [];
    todos.push({
      id: 1,
      name: 'Makan',
      isDone: false,
      subTodos: []
    });

    todos.push({
      id: 2,
      name: 'Minum',
      isDone: false,
      subTodos: []
    });

    this.storage.setItem('todos', JSON.stringify(todos));
    return todos;
  }

  public getAll(): Observable<Todo[]> {
    return new Observable((observer: Observer<Todo[]>) => {
      const todoValue: string = this.storage.getItem('todos') as string;
      try {
        if (!todoValue) {
          const todos = this.createTodos();
          observer.next(todos);
        } else {
          observer.next(JSON.parse(todoValue));
        }
      } catch (error: any) {
        observer.error(error.message)
      }
      observer.complete();
    })
  }

  public getById(id: number): Observable<Todo> {
    return new Observable((observer: Observer<Todo>) => {
      const todoValue: string = this.storage.getItem('todos') as string;
      try {
        const todos: Todo[] = JSON.parse(todoValue);
        const todo = todos.find(item => item.id === id) as Todo;
        observer.next(todo);
      } catch (error: any) {
        observer.error(error.message)
      }
    })
  }

  public save(todo: Todo): Observable<Todo> {
    return new Observable((observer: Observer<Todo>) => {
      const todoValue: string = this.storage.getItem('todos') as string;
      try {
        const todos: Todo[] = JSON.parse(todoValue);
        if (todo.id) {
          todos.forEach((item, index) => {
            if (item.id === todo.id) {
              todos.splice(index, 1, todo)
            }
          })
        } else {
          todo.id = todos[todos.length - 1].id + 1;
          todos.push(todo);
        }
        this.storage.setItem('todos', JSON.stringify(todos));
        observer.next(todo);
        this.todoSubject.next(true);
      } catch (error: any) {
        observer.error(error.message)
      }
      observer.complete();
    })
  }

  public delete(id: number): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      const todoValue: string = this.storage.getItem('todos') as string;
      try {
        const todos: Todo[] = JSON.parse(todoValue);
        const newTodo: Todo[] = todos.filter(todo => todo.id !== id);
        this.storage.setItem('todos', JSON.stringify(newTodo));
        observer.next();
        this.todoSubject.next(true);
      } catch (error: any) {
        observer.error(error.message)
      }
      observer.complete();
    })
  }

  public isListUpdated(): Observable<boolean> {
    return this.todoSubject.asObservable()
  }

}