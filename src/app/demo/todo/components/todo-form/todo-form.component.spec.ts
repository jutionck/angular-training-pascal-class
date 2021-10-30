import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { Todo } from "../../models/todo.model";
import { TodoService } from "../../services/todo.service";
import { TodoFormComponent } from "./todo-form.component";

describe('TodoFormComponent()', () => {

  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [TodoService]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  const form = (id: number, name: string, isDone: boolean, subTodos: []) => {
    component.todoForm.controls['id'].setValue(id);
    component.todoForm.controls['name'].setValue(name);
    component.todoForm.controls['isDone'].setValue(isDone);
    component.todoForm.controls['subTodos'].setValue([subTodos])
  }

  it('Component created', () => {
    expect(component).toBeTruthy();
  })

  it('Component form initial state', () => {
    expect(component.todoForm).toBeDefined();
    expect(component.todoForm.valid).toBeDefined();
    expect(component.todoForm.invalid).toBeDefined();
  })

  it('TodoForm field validity', () => {
    let error: ValidationErrors = {};
    let name: AbstractControl = component.todoForm.controls['name'];
    expect(name.valid).toBeFalse();

    error = name.errors || {};
    expect(error['required']).toBeTruthy()

    component.todoForm.get('name').setValue('A');
    error = name.errors['minlength'] || {};
    expect(error).toBeTruthy()
  })

  it('Successfully submit from onSubmitTodo()', () => {
    component.todoForm.value.name = 'Makan'
    component.onSubmitTodo();
  })


});