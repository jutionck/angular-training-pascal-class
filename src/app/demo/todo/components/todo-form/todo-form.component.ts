import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { printLog } from 'src/environments/environment';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges, DoCheck {

  @Input() todo?: Todo;
  // @Output() saveTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  // penerapan two way
  @Output() todoChange: EventEmitter<Todo> = new EventEmitter<Todo>();

  DocheckCount = 0;
  changelog: string[] = [];
  todoOld?: Todo;

  todoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    isDone: new FormControl(false),
    subTodos: new FormArray([])
  })

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.todo) {
      this.todoForm.setValue(this.todo)
    }
  }

  onSubmitTodo(): void {
    console.log(this.todoForm.value);

    this.todoChange.emit(this.todoForm.value)
    this.todoForm.reset();
  }

  // validator
  // isValid(): boolean {
  //   return !this.todoForm.get('name')?.value
  // }

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

  //form array
  getSubTodo(): any[] {
    const subTodos: FormArray = this.todoForm.get('subTodos') as FormArray;

    return subTodos.controls;
  }

  addTodo(): void {
    const subs: FormArray = this.todoForm.get('subTodos') as FormArray;
    subs.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      isDone: new FormControl(false),
    }))
  }

  ngDoCheck(): void {
    printLog('Todo DoCheck');
    this.DocheckCount++;
    if (this.todoOld?.name !== this.todo?.name) {
      const to = JSON.stringify(this.todo);
      const from = JSON.stringify(this.todoOld);
      const changeLog = `DoCheck customer: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
      this.todoOld = Object.assign({}, this.todo);
    }
  }


}
