import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertMessage } from 'src/app/shared/models/alert-message.model';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  todo?: Todo;
  message?: AlertMessage;
  todoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    isDone: new FormControl(false),
    subTodos: new FormArray([])
  })

  constructor(
    private readonly todoService: TodoService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map((params: Params) => {
        return params.id ? +params.id : null
      })
    ).subscribe(id => {
      this.todo = this.todoService.getTodoById(id);
      this.setFormValue();
    })
  }

  setFormValue(): void {
    if (this.todo) {
      this.todoForm.setValue(this.todo)
    }
  }

  onSubmitTodo(): void {
    const todo: Todo = this.todoForm.value;
    this.todoService.saveTodo(todo);
    this.message = {
      status: 'success',
      text: `Todo ${todo.name} berhasil tersimpan`
    }
    this.todoForm.reset();
    this.router.navigateByUrl('/demo/todos');
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
}
