import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Observer, Subject } from "rxjs";
import { Todo } from "../models/todo.model";

@Injectable()
export class NewTodoService {

  private readonly storage: Storage = sessionStorage;
  private todoSubject: Subject<boolean> = new Subject<boolean>()

  // private createTodos(): Todo[] {
  //   const todos: Todo[] = [];
  //   todos.push({
  //     id: 1,
  //     name: 'Makan',
  //     isDone: false,
  //     subTodos: []
  //   });

  //   todos.push({
  //     id: 2,
  //     name: 'Minum',
  //     isDone: false,
  //     subTodos: []
  //   });

  //   this.storage.setItem('todos', JSON.stringify(todos));
  //   return todos;
  // }

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAll(): Observable<Todo[]> {
    // return new Observable((observer: Observer<Todo[]>) => {
    //   const todoValue: string = this.storage.getItem('todos') as string;
    //   try {
    //     if (!todoValue) {
    //       const todos = this.createTodos();
    //       observer.next(todos);
    //     } else {
    //       observer.next(JSON.parse(todoValue));
    //     }
    //   } catch (error: any) {
    //     observer.error(error.message)
    //   }
    //   observer.complete();
    // })

    const token: string = sessionStorage.getItem('token') as string;
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-type': 'Application/json; charset=utf-8'
    });
    return this.http.get<Todo[]>('/api/todos', { headers });

  }

  public getById(id: number): Observable<Todo> {
    // return new Observable((observer: Observer<Todo>) => {
    //   const todoValue: string = this.storage.getItem('todos') as string;
    //   try {
    //     const todos: Todo[] = JSON.parse(todoValue);
    //     const todo = todos.find(item => item.id === id) as Todo;
    //     observer.next(todo);
    //   } catch (error: any) {
    //     observer.error(error.message)
    //   }
    // })
    const token: string = sessionStorage.getItem('token') as string;
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-type': 'Application/json; charset=utf-8'
    });
    return this.http.get<Todo>(`/api/todos/${id}`, { headers });
  }

  public save(todo: Todo, image?: File): Observable<Todo> {
    // return new Observable((observer: Observer<Todo>) => {
    //   const todoValue: string = this.storage.getItem('todos') as string;
    //   try {
    //     const todos: Todo[] = JSON.parse(todoValue);
    //     if (todo.id) {
    //       todos.forEach((item, index) => {
    //         if (item.id === todo.id) {
    //           todos.splice(index, 1, todo)
    //         }
    //       })
    //     } else {
    //       todo.id = todos[todos.length - 1].id + 1;
    //       todos.push(todo);
    //     }
    //     this.storage.setItem('todos', JSON.stringify(todos));
    //     observer.next(todo);
    //     this.todoSubject.next(true);
    //   } catch (error: any) {
    //     observer.error(error.message)
    //   }
    //   observer.complete();
    // })
    // const token: string = sessionStorage.getItem('token') as string;
    // const headers: HttpHeaders = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`,
    //   'Content-type': 'Application/json; charset=utf-8'
    // });
    const formData: FormData = new FormData();
    formData.append('name', todo.name);
    formData.append('isDone', `${todo.isDone}`);
    formData.append('image', image, image.name)

    if (todo.id) {
      return this.http.put<Todo>('/api/todos', formData)
    } else {
      return this.http.post<Todo>('/api/todos', formData)
    }
  }

  public delete(id: number): Observable<void> {
    // return new Observable((observer: Observer<void>) => {
    //   const todoValue: string = this.storage.getItem('todos') as string;
    //   try {
    //     const todos: Todo[] = JSON.parse(todoValue);
    //     const newTodo: Todo[] = todos.filter(todo => todo.id !== id);
    //     this.storage.setItem('todos', JSON.stringify(newTodo));
    //     observer.next();
    //     this.todoSubject.next(true);
    //   } catch (error: any) {
    //     observer.error(error.message)
    //   }
    //   observer.complete();
    // })
    const token: string = sessionStorage.getItem('token') as string;
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-type': 'Application/json; charset=utf-8'
    });
    return this.http.delete<void>(`/api/todos/${id}`, { headers });
  }

  public isListUpdated(): Observable<boolean> {
    return this.todoSubject.asObservable()
  }

}