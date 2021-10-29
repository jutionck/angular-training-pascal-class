import { TestBed } from "@angular/core/testing";
import { Todo } from "../models/todo.model";
import { TodoService } from "./todo.service";

describe('TodoService Without HTTP Service', () => {

  let service: TodoService;
  const todoMock: Todo[] = [
    {
      id: 1,
      name: 'Makan',
      isDone: false,
      subTodo: []
    },
    {
      id: 2,
      name: 'Minum',
      isDone: true,
      subTodo: []
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    })
    service = TestBed.inject(TodoService);
  })

  afterEach(() => {
    sessionStorage.removeItem('todos');
  })

  it('Todo service created', () => {
    expect(service).toBeDefined();
  });

  it('Todo service have a getAll() method', () => {
    expect(service.getAll).toBeDefined();
  });

  it('Getting all initial data from sessionStorage ', () => {
    sessionStorage.getItem('todos');
    const getTodo = service.getAll();
    expect(getTodo).toEqual([]);
  })

  it('Get all data', () => {
    sessionStorage.setItem('todos', JSON.stringify(todoMock));
    const getTodo = service.getAll();
    expect(getTodo).toEqual(todoMock);
  })

  it("Success insert data from saveTodo method", () => {
    const dummyTodo: Todo = {
      name: "Rebahan",
      isDone: true,
      subTodo: [],
    };
    service.saveTodo(dummyTodo);
    const todo = sessionStorage.getItem("todos");
    const saveTodoConvert = JSON.parse(todo as string);
    expect(saveTodoConvert[0].name).toBe("Rebahan");
  });

  it("Success update data from saveTodo method", () => {
    sessionStorage.setItem("todos", JSON.stringify(todoMock));
    const todoSessionStorage = sessionStorage.getItem("todos");
    const todoSessionStorageParse = JSON.parse(todoSessionStorage);
    expect(todoSessionStorageParse[0]).toEqual(todoMock[0]);
    const dummyTodo: Todo = {
      id: 1,
      name: "Rebahan",
      isDone: true,
      subTodo: [],
    };
    service.saveTodo(dummyTodo);
    expect(todoSessionStorageParse[0].id).toBe(1);
  });

  it("Succes delete data from deleteTodo method", () => {
    sessionStorage.setItem("todos", JSON.stringify(todoMock));
    const todoSessionStorage = sessionStorage.getItem("todos");
    const todoSessionStorageParse = JSON.parse(todoSessionStorage);
    const todoId: number = todoSessionStorageParse.findIndex(item => item.id == todoSessionStorageParse[0].id);
    service.deleteTodo(todoId);
    todoSessionStorageParse.splice(todoId, 1);
    const todoDeleteCheck = sessionStorage.getItem("todos");
    const todoDeleteCheckParse = JSON.parse(todoDeleteCheck);
    expect(todoDeleteCheckParse[0]).toEqual(undefined);
  });

  it("Succes change isDone with checkedTodo method", () => {
    const todoCheckMock: Todo = { id: 1, name: "Rebahan", isDone: false };
    sessionStorage.setItem("todos", JSON.stringify(todoMock));
    const todoSessionStorage = sessionStorage.getItem("todos");
    const todoSessionStorageParse = JSON.parse(todoSessionStorage);
    todoSessionStorageParse.forEach((item) => {
      if (item.id === todoCheckMock.id) {
        item.isDone = !item.isDone;
        service.checkedTodo(todoCheckMock);
        sessionStorage.setItem(
          "todos",
          JSON.stringify(todoSessionStorageParse)
        );
      }
    });
    expect(todoSessionStorageParse[0].isDone).toBe(true);
  });

  it("Succes getByTodoId", () => {
    const todoCheckMock: Todo = { id: 1, name: "Rebahan", isDone: false };
    sessionStorage.setItem("todos", JSON.stringify(todoMock));
    const todoSessionStorage = sessionStorage.getItem("todos");
    const todoSessionStorageParse = JSON.parse(todoSessionStorage);
    const todoIdMock = todoSessionStorageParse.find(
      (item) => item.id === todoCheckMock.id
    );
    service.getTodoById(todoCheckMock.id);
    expect(todoIdMock.id).toBe(1);
  });


});