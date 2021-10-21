import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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

  // validasi form
  isFieldValid(fieldName: string): string {
    const control: AbstractControl = this.todoForm.get(fieldName) as AbstractControl;

    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid';
    } else {
      return '';
    }
  }

  // displayErrors(fieldName: string): string {
  //   const control: AbstractControl = this.todoForm.get(fieldName) as AbstractControl;

  //   const messages: any = {
  //     'required': 'Field ini wajib diisi',
  //     'minlength': 'Field ini harus melebihi panjang {minlength}'
  //   }

  //   if (control && control.errors) {
  //     const error = Object.values(control.errors).pop();
  //     const key = Object.keys(control.errors).pop() as string;

  //     console.log(key);


  //     let message = messages[key];
  //     if (key === 'minlength') {
  //       message = message.replace('{minlength}', error.requiredLength)
  //     }


  //     return message;
  //   }
  // }

}
