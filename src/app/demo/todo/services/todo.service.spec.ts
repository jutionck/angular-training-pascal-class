import { TestBed } from "@angular/core/testing"
import { Todo } from "../models/todo.model";
import { TodoService } from "./todo.service";

describe('TodoService', () => {
  let service: TodoService
  const todoMock: Todo[] =
    [
      {
        id: 1,
        name: 'Rebahan',
        isDone: false,
        subTodo: []
      }
    ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TodoService]
    });
    service = TestBed.inject(TodoService);
  })

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it('Should have getAll method', () => {
    expect(service.getAll).toBeDefined()
  })

  it('Should get data from getAll method if sessionStorage todos []', () => {
    sessionStorage.getItem('todos')
    const getTodo = service.getAll()
    expect(getTodo).toEqual([])
    sessionStorage.removeItem('todos')
  })

  it('Should get data from getAll method if sessionStorage todos any data', async () => {
    sessionStorage.setItem('todos', JSON.stringify(todoMock));
    const getTodo = await service.getAll()
    expect(getTodo).toEqual(todoMock);
    sessionStorage.removeItem('todos')
  })


  it('Success insert data from saveTodo method', (done) => {
    const dummyTodo: Todo = {
      name: "Rebahan",
      isDone: true,
      subTodo: [],
    };
    done()
    service.saveTodo(dummyTodo)
    const todo = sessionStorage.getItem('todos');
    const saveTodoConvert = JSON.parse(todo)
    expect(saveTodoConvert[0].name).toBe("Rebahan")
    sessionStorage.removeItem('todos')
  })

  it('Success update data from saveTodo method', (done) => {
    sessionStorage.setItem('todos', JSON.stringify(todoMock));
    const todoSessionStorage = sessionStorage.getItem('todos');
    const todoSessionStorageParse = JSON.parse(todoSessionStorage);
    expect(todoSessionStorageParse[0]).toEqual(todoMock[0]);
    const dummyTodo: Todo = {
      id: 1,
      name: "Rebahan",
      isDone: true,
      subTodo: [],
    };
    service.saveTodo(dummyTodo)
    expect(todoSessionStorageParse[0].id).toBe(1);
    done()
    sessionStorage.removeItem('todos')
  })

  it('Succes delete data from deleteTodo method', (done) => {
    sessionStorage.setItem('todos', JSON.stringify(todoMock));
    const todoSessionStorage = sessionStorage.getItem('todos');
    const todoSessionStorageParse = JSON.parse(todoSessionStorage);
    service.deleteTodo(todoSessionStorageParse[0].id)
    const todoDeleteCheck = sessionStorage.getItem('todos');
    const todoDeleteCheckParse = JSON.parse(todoDeleteCheck);
    expect(todoDeleteCheckParse[0]).toEqual(undefined);
    done();
  })

  it('Succes change isDone with checkedTodo method', () => {
    const todoCheckMock: Todo = { id: 1, name: 'Rebahan', isDone: false }
    sessionStorage.setItem('todos', JSON.stringify(todoMock));
    const todoSessionStorage = sessionStorage.getItem('todos');
    const todoSessionStorageParse = JSON.parse(todoSessionStorage);
    todoSessionStorageParse.forEach(item => {
      if (item.id === todoCheckMock.id) {
        item.isDone = !item.isDone
        service.checkedTodo(todoCheckMock)
        sessionStorage.setItem('todos', JSON.stringify(todoSessionStorageParse));
      }
    });
    expect(todoSessionStorageParse[0].isDone).toBe(true);
    sessionStorage.removeItem('todos')
  })

  it('Succes getByTodoId', () => {
    const todoCheckMock: Todo = { id: 1, name: 'Rebahan', isDone: false }
    sessionStorage.setItem('todos', JSON.stringify(todoMock));
    const todoSessionStorage = sessionStorage.getItem('todos');
    const todoSessionStorageParse = JSON.parse(todoSessionStorage);
    const todoIdMock = todoSessionStorageParse.find(item => item.id === todoCheckMock.id)
    service.getTodoById(todoCheckMock.id)
    expect(todoIdMock.id).toBe(1)
    sessionStorage.removeItem('todos')
  })
})
