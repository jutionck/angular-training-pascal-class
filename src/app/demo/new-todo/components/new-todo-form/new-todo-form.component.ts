import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessage } from 'src/app/shared/models/alert-message';
import { NewTodoService } from '../../services/new-todo.service';
import { delay, map, switchMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-new-todo-form',
  templateUrl: './new-todo-form.component.html',
  styleUrls: ['./new-todo-form.component.scss']
})
export class NewTodoFormComponent implements OnInit {

  message?: AlertMessage;
  loading: boolean = false;
  todoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    isDone: new FormControl(false),
    photo: new FormControl(),
    subTodos: new FormArray([])
  })
  photo?: File;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly todoService: NewTodoService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.pipe(
      map(params => params.id),
      delay(2000),
      switchMap((id: string) => {
        if (!id) return EMPTY
        else {
          return this.todoService.getById(+id)
        }
      })
    )
      .subscribe((todo: Todo) => {
        if (todo) {
          this.setFormValues(todo);
        }
      }, console.error,
        () => this.loading = false
      )
  }

  setFormValues(todo: Todo): void {
    this.todoForm.get('id')?.setValue(todo.id);
    this.todoForm.get('name')?.setValue(todo.name);
    this.todoForm.get('isDone')?.setValue(todo.isDone);
    if (Array.isArray(todo.subTodos) && todo.subTodos.length > 0) {
      todo.subTodos.forEach((subTodo) => {
        this.addTodo(subTodo);
      })
    }
  }

  onSubmitTodo(): void {
    const todo: Todo = this.todoForm.value;
    this.todoService.save(todo, this.photo)
      .subscribe(() => {
        this.router.navigateByUrl('/demo/new-todos');
        this.todoForm.reset()
      })
  }

  onTodoPhoto(event: any): void {
    const files: FileList = event.target.files;
    console.log(files.item(0));

    if (files) {
      this.photo = files.item(0);
      this.todoForm.get('photo')?.setValue(this.photo)
    }
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

  //form array
  getSubTodo(): any[] {
    const subTodos: FormArray = this.todoForm.get('subTodos') as FormArray;

    return subTodos.controls;
  }

  addTodo(todo?: Todo): void {
    const subs: FormArray = this.todoForm.get('subTodos') as FormArray;
    subs.push(new FormGroup({
      id: new FormControl(todo ? todo.id : null),
      name: new FormControl(todo ? todo.name : null, [Validators.required, Validators.minLength(3)]),
      isDone: new FormControl(todo ? todo.isDone : false),
    }))
  }
}
