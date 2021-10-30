import { TestBed } from "@angular/core/testing";
import { from } from "rxjs";
import { Todo } from "../../models/todo.model";
import { TodoService } from "../../services/todo.service";
import { TodoListComponent } from "./todo-list.component"

describe('TodoListComponent With DI', () => {

  let component: TodoListComponent;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoListComponent,
        {
          provide: TodoService
        }
      ]
    });
    component = TestBed.inject(TodoListComponent);
    todoService = TestBed.inject(TodoService);
  })

  it('Should showing todos list after create component', () => {
    expect(component.todos).toEqual([]);
  })

  it('Should showing todos', () => {
    const todoMock: Todo[] = [
      {
        id: 1,
        name: 'Makan',
        isDone: false
      },
      {
        id: 2,
        name: 'Minum',
        isDone: true
      },
      {
        id: 3,
        name: 'Rebahan',
        isDone: false
      }
    ];
    component.ngOnInit();
    // todoService.getAll();
    component.todos = todoMock;
    expect(component.todos).toEqual(todoMock);
    expect(component.todos.length).toEqual(todoMock.length);
  })

  it('Should onCheckTodo is Defined', () => {
    expect(component.onCheckTodo).toBeDefined()
  })

  it('Should onSelectTodo is Defined', () => {
    expect(component.onSelectTodo).toBeDefined()
  })

  it('Should onDeleteTodo is Defined', () => {
    expect(component.onDeleteTodo).toBeDefined()
  })
})
