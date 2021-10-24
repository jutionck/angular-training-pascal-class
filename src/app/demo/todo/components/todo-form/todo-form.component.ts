import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertMessage } from 'src/app/shared/models/alert-message.model';
import { SessionService } from 'src/app/shared/services/session.service';
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
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    isDone: new FormControl(false),
  })

  constructor(
    private readonly session: SessionService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.todo) {
      this.todoForm.setValue(this.todo)
    }
  }

  onSubmitTodo(): void {
    console.log(this.todoForm.value);
    const todo: Todo = this.todoForm.value
    const message: AlertMessage = {
      status: 'success', text: `Todo ${todo.name} saved`
    }
    this.todoChange.emit(todo)
    this.todoForm.reset();
    this.session.setFlash(JSON.stringify(message));
  }

  // validasi form
  isFieldValid(fieldName: string, parent?: AbstractControl): string {
    const control: AbstractControl = this.todoForm.get(fieldName) as AbstractControl;

    if (parent) {
      parent = control;
    }

    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid';
    } else {
      return '';
    }
  }


}
