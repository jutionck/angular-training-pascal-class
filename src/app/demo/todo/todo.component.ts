import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  // todo?: Todo;

  todoValue?: Todo; // untuk Two Way Data Binding

  get todo(): Todo {
    return this.todoValue as Todo;
  }

  set todo(todo: Todo) {
    // this.todoValue = undefined;
    this.onSaveTodo(todo);
  }

  ngOnInit(): void {
  }

  onToggleTodo(): void {
    sessionStorage.setItem('todos', JSON.stringify(this.todos));
  }

  onEditTodo(todo: Todo): void {
    console.log(todo);
    this.todoValue = todo;
  }

  onSaveTodo(todo: Todo): void {
    if (this.todoValue) {
      this.todos = this.todos.map((item) => {
        if (item.id === todo.id) {
          item = { ...item, ...todo }
        }
        return item;
      })
      sessionStorage.setItem('todos', JSON.stringify(this.todos));
    } else {
      todo.id = this.todos.length + 1;
      this.todos.push(todo);
      sessionStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }

  onDeleteTodo(todo: Todo): void {
    console.log('Todo yang akan di hapus', todo);
    if (todo.isDone) {
      alert('Todo ini tidak boleh di hapus karena sudah selesai')
    } else {
      this.todos.splice(1, 1);
      sessionStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }

  /**
   * Penerapan two way data binding bisa menggunakan getter setter
   * Untuk penerapan nya sama saja menggunakan @Input dan @Output
   * Untuk @Input bisa diberi nama misalnya todo, untuk @Output bisa diberi nama todoChange
   * Kata kunci two way di @Output adalah di change
   */

}
