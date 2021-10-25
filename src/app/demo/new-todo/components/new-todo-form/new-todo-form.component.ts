import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertMessage } from 'src/app/shared/models/alert-message';

@Component({
  selector: 'app-new-todo-form',
  templateUrl: './new-todo-form.component.html',
  styleUrls: ['./new-todo-form.component.scss']
})
export class NewTodoFormComponent implements OnInit {

  message?: AlertMessage;
  todoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    isDone: new FormControl(false)
  })
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitTodo(): void {
  }

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
