import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

const TODO_LIST = 'todos';

@Injectable()
export class TodoService {

  private todos: Todo[] = [];
  private storage: Storage = sessionStorage;

  getAll(): Todo[] {
    const todoValue: string = this.storage.getItem(TODO_LIST);
    try {
      const todos: Todo[] = todoValue ? JSON.parse(todoValue) : [];
      this.todos = todos;
      this.updateSessionStorage()
      return todos;
    } catch (error) {
      console.error(error);
    }
  }

  saveTodo(todo: Todo): void {
    try {
      if (!todo.id) {
        todo.id = this.todos.length < 1 ? 1 : this.todos[this.todos.length - 1].id + 1;
        this.todos.push(todo);
      } else {
        this.todos.forEach((item, index) => {
          if (item.id === todo.id) {
            this.todos.splice(index, 1, todo)
          }
        })
      }
      this.updateSessionStorage();
    } catch (error) {
      console.error(error);
    }
  }

  deleteTodo(id: number): void {
    try {
      const todoId: number = this.todos.findIndex(item => item.id == id);
      this.todos.splice(todoId, 1);
      this.updateSessionStorage();
    } catch (error) {
      console.error(error)
    }
  }

  checkedTodo(todo: Todo): void {
    try {
      this.todos.forEach(item => {
        if (item.id === todo.id) {
          item.isDone = !item.isDone
          this.updateSessionStorage()
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  getTodoById(id: number): Todo {
    try {
      return this.todos.find(item => item.id === id);
    } catch (error) {
      console.error(error)
    }
  }

  private updateSessionStorage(): void {
    this.storage.setItem(TODO_LIST, JSON.stringify(this.todos));
  }
}
