import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  @Input() todo;

  todos: Todo[] = []; // kalo bisa tipe data jangan menggunakan any -> interface, class
  placeHolder = 'Todo name ?';
  isDone = false;

  pageTitle = 'Todo Form'
  ngOnInit(): void {

  }

  toggleDone(target: any): void {
    console.log(target.checked);
    this.isDone = target.checked
  }

  todoChange = '?';

  todoForm: FormGroup = new FormGroup({
    name: new FormControl(''),

  })

  addTodo(): void {
    console.log('Todo: ', this.todoForm.value);
  }

}
