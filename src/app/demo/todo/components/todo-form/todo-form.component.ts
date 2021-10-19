import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {

  @Input() todo?: Todo;
  // @Output() saveTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  // penerapan two way
  @Output() todoChange: EventEmitter<Todo> = new EventEmitter<Todo>();

  todoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    isDone: new FormControl(false)
  })

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.todo) {
      this.todoForm.setValue(this.todo)
    }
  }

  onSubmitTodo(): void {
    this.todoChange.emit(this.todoForm.value)
    this.todoForm.reset();
  }

  // validator
  // isValid(): boolean {
  //   return !this.todoForm.get('name')?.value
  // }

}
