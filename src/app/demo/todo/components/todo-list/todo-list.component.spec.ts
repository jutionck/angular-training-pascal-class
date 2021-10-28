import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Todo } from "../../models/todo.model";
import { TodoService } from "../../services/todo.service";
import { TodoListComponent } from "./todo-list.component";

describe("TodoListComponent With DI", () => {
  let component: TodoListComponent;
  let todoServive: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TodoListComponent,
        {
          provide: TodoService,
        },
      ],
    });

    component = TestBed.inject(TodoListComponent);
    todoServive = TestBed.inject(TodoService);
  });

  it("should showing task list after create compnent", () => {
    expect(component.todos).toEqual([]);
  });

  it("should showing task after onInit", fakeAsync(() => {
    const mock: Todo[] = [
      {
        id: 1,
        name: "Task 1",
        isDone: true,
      },
      {
        id: 2,
        name: "Task 2",
        isDone: false,
      },
      {
        id: 3,
        name: "Task 3",
        isDone: false,
      },
    ];
    component.ngOnInit();
    todoServive.getAll();
    component.todos = mock;
    expect(component.todos).toEqual(mock);
    expect(component.todos.length).toEqual(mock.length);
    tick(3000);
  }));
})