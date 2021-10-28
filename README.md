# Introduction Angular Unit Testing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

### Part Introduction Matcher

1. Common Matchers

   - `toEqual`
   - `toBe`

2. Truthiness
   - `toBeNull` matches only `null`
   - `toBeUndefined` matches only `undefined`
   - `toBeDefined` is the opposite of `toBeUndefined`
   - `toBeTruthy` matches anything that an if statement treats as `true`
   - `toBeFalsy` matches anything that an if statement treats as `false`

### PART Practice Matcher

Open `src/test.ts` and modify that

```ts
const context = require.context("./test", true, /sample\.spec\.ts$/);
```

Create file `src/test/sample.spec.ts`

```ts
const HelloWorld = () => {
  return "Hello World";
};

describe("HelloWorld()", () => {
  it("Say hello world", () => {
    expect(HelloWorld()).toBe("Hello World");
  });
});

describe("The Truthiness", () => {
  it("Test null", () => {
    const n = false;
    expect(n).not.toBeNull();
    expect(n).toBeDefined();
    expect(n).toBeFalse();
    expect(n).not.toBeTruthy();
    expect(n).not.toBeUndefined();
  });
});

describe("The Number Matcher", () => {
  it("Value is 0.4", () => {
    const value = 0.2 + 0.3;
    // expect('3').toBeGreaterThan(3)
    // expect(value).toBeGreaterThanOrEqual(3.5)
    // expect(value).toBeLessThan(5)
    // expect(value).toBeLessThanOrEqual(4.5)
    expect(value).toBe(0.5);
    expect(value).toBeCloseTo(0.499); // floating or double
    // expect('3').toEqual('3')
  });
});

/**
 * String matcher => toMatch
 */
describe("The String Matcher", () => {
  it('Find "camp" in "Enigmacamp"', () => {
    const bootcamp: string = "Enigmacamp";
    expect(bootcamp).toMatch(/camp/);
  });
});

describe("The Array Matcher", () => {
  const bootcamp = ["Enigma", "Enigma Camp", "Enigma Lagi", "Enigma Terus"];
  it("Indonesia's best bootcamp is 'Enigma'", () => {
    expect(bootcamp).toContain("Enigma");
  });
});

describe("The testing Asynchronous", () => {
  describe("#Callbak", () => {
    const fetchData = (cb: Function) => {
      setTimeout(() => {
        cb("Enigmacamp");
      }, 1000);
    };
    it("The data is Enigmacamp", (done) => {
      const callback = (data) => {
        expect(data).toBe("Enigmacamp");
        done();
      };
      fetchData(callback);
    });
  });

  describe("#Promise", () => {
    const fetchData = () => {
      return new Promise((resolve) => {
        resolve("Enigmacamp");
      });
    };

    it("the data is Enigmacamp", () => {
      return fetchData().then((data) => {
        expect(data).toBe("Enigmacamp");
      });
    });
  });

  describe("#Async/Await", () => {
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        try {
          resolve("Enigmacamp");
        } catch {
          reject("error");
        }
      });
    };

    it("the data is Enigmacmap", async () => {
      await fetchData().then((data) => {
        expect(data).toBe("Enigmacamp");
      });
  });
});
```

### PART Component Test

Open `app.component.spec.ts` and adding script like this

```ts
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent()", () => {
  let fixture: ComponentFixture<AppComponent>;
  let element: HTMLElement;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, BsbuttonDirective, HighlightDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it("Should create the AppComponent", () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should have as title "Angular Intro"', () => {
    const app = fixture.componentInstance;
    expect(app.title).toBe("Angular Intro");
  });

  it("Should have a function sum(2, 2) result 4", () => {
    const app = fixture.componentInstance;
    expect(app.sum(-2, 1)).toEqual(-1);
  });

  it("Should have <app-header></app-header>", () => {
    const appHeader = element.querySelector("app-header");
    expect(appHeader).toBeTruthy();
  });

  it("No title in the DOM after create component", () => {
    const header = element.querySelector("h1");
    expect(header.textContent).toEqual("");
  });

  it('should display title = "Angular Intro" in html', () => {
    const header = element.querySelector("h1");
    fixture.detectChanges();
    expect(header.textContent).toContain(component.title);
  });
});
```

Open `app.component.html`

```html
<app-header></app-header>
<div class="container-md shadow-lg my-md-2 mx-auto">
  <h1>{{ title }}</h1>
  <router-outlet></router-outlet>
</div>
<app-footer></app-footer>
```

### PART Directive Test

Modify `app.component.spec.ts`

```ts
// ... //
let debugElement: DebugElement;

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [AppComponent, BsbuttonDirective, HighlightDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  element = fixture.nativeElement;
  debugElement = fixture.debugElement;
});

it("should have one appHiglight element", () => {
  fixture.detectChanges();
  const highlight = debugElement.queryAll(By.directive(HighlightDirective));
  expect(highlight.length).toBe(1);
  fixture.detectChanges();
});

it("should have one appBsbutton element", () => {
  const bsButton = debugElement.queryAll(By.directive(BsbuttonDirective));
  // fixture.detectChanges();
  expect(bsButton.length).toBe(1);
});
```

### PART `fakeAsync` and `Tick`

Modify `app.component.spec.ts`

```ts
describe("#fakeAsync and Tick", () => {
  it("Asynchronous test example with setTimeOut without fakeAsync and tick", () => {
    let test: boolean = false;
    setTimeout(() => {
      console.log("running assertion");
      test = true;
      expect(test).toBeTruthy();
    }, 1000);
  });

  it("Asynchronous test example with setTimeOut without fakeAsync and tick", fakeAsync(() => {
    let test: boolean = false;
    setTimeout(() => {
      console.log("running assertion");
      test = true;
      expect(test).toBeTruthy();
    }, 1000);
    expect(test).toBe(false);
    tick(500);
    expect(test).toBe(false);
    tick(500);
    expect(test).toBe(true);
  }));
});
```

### PART Module Test

Create file `app/module.spec.ts` add script this :

```ts
describe("Module Test", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        SharedModule,
        DemoModule,
        AuthModule,
        PagesModule,
        ResumeModule,
        SampleModule,
      ],
    });
  });

  it("initialize AppModule", () => {
    const module = TestBed.inject(AppModule);
    expect(module).toBeTruthy();
  });

  it("initialize SharedModule", () => {
    const module = TestBed.inject(SharedModule);
    expect(module).toBeTruthy();
  });

  it("initialize DemoModule", () => {
    const module = TestBed.inject(DemoModule);
    expect(module).toBeTruthy();
  });

  it("initialize AuthModule", () => {
    const module = TestBed.inject(AuthModule);
    expect(module).toBeTruthy();
  });

  it("initialize PagesModule", () => {
    const module = TestBed.inject(PagesModule);
    expect(module).toBeTruthy();
  });

  it("initialize ResumeModule", () => {
    const module = TestBed.inject(ResumeModule);
    expect(module).toBeTruthy();
  });

  it("initialize SampleModule", () => {
    const module = TestBed.inject(SampleModule);
    expect(module).toBeTruthy();
  });
});
```

### PART Routing Test

```ts
import { Location } from "@angular/common";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppRoutingModule } from "./app-routing.module";
import { AboutComponent } from "./pages/about/about.component";

describe("AppRoutingModule()", () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), AppRoutingModule],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(AboutComponent);
    router.initialNavigation();
  });

  it('navigate to "" get resumeComponent', fakeAsync(() => {
    router.navigate(["/about"]).then(() => {
      tick(50);
      expect(location.path()).toBe("/about");
    });
  }));
});
```

### PART Service Test

Create file `todo.service.spec.ts` on `todo` folder and add script this

```ts
describe("TodoService", () => {
  let service: TodoService;
  const todoMock: Todo[] = [
    {
      id: 1,
      name: "Rebahan",
      isDone: false,
      subTodo: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Should have getAll method", () => {
    expect(service.getAll).toBeDefined();
  });

  it("Should get data from getAll method if sessionStorage todos []", () => {
    sessionStorage.getItem("todos");
    const getTodo = service.getAll();
    expect(getTodo).toEqual([]);
    sessionStorage.removeItem("todos");
  });

  it("Should get data from getAll method if sessionStorage todos any data", async () => {
    sessionStorage.setItem("todos", JSON.stringify(todoMock));
    const getTodo = await service.getAll();
    expect(getTodo).toEqual(todoMock);
    sessionStorage.removeItem("todos");
  });

  it("Success insert data from saveTodo method", (done) => {
    const dummyTodo: Todo = {
      name: "Rebahan",
      isDone: true,
      subTodo: [],
    };
    done();
    service.saveTodo(dummyTodo);
    const todo = sessionStorage.getItem("todos");
    const saveTodoConvert = JSON.parse(todo);
    expect(saveTodoConvert[0].name).toBe("Rebahan");
    sessionStorage.removeItem("todos");
  });

  it("Success update data from saveTodo method", (done) => {
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
    done();
    sessionStorage.removeItem("todos");
  });

  it("Succes delete data from deleteTodo method", (done) => {
    sessionStorage.setItem("todos", JSON.stringify(todoMock));
    const todoSessionStorage = sessionStorage.getItem("todos");
    const todoSessionStorageParse = JSON.parse(todoSessionStorage);
    service.deleteTodo(todoSessionStorageParse[0].id);
    const todoDeleteCheck = sessionStorage.getItem("todos");
    const todoDeleteCheckParse = JSON.parse(todoDeleteCheck);
    expect(todoDeleteCheckParse[0]).toEqual(undefined);
    done();
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
    sessionStorage.removeItem("todos");
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
    sessionStorage.removeItem("todos");
  });
});
```

### PART Unit Testing Component With Dependency

Create a file `todo-list.component.spec.ts`

```ts
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
});
```

> Challenge trainee for other method

### Part Unit Testing Component with FormGroup and ReactiveForm

Creata a file `auth.component.spec.ts`

```ts
describe("AuthComponent", () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const form = (username: string, password: string) => {
    component.authForm.controls["username"].setValue(username);
    component.authForm.controls["password"].setValue(password);
  };

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("component initial state", () => {
    expect(component.authForm).toBeDefined();
    expect(component.authForm.invalid).toBeTruthy();
  });

  it("check validality", () => {
    form("admin", "admin");
    const authMock: Login = { username: "admin", password: "admin" };
    expect(component.authForm.value).toEqual(authMock);
  });

  it("AuthForm field validity", () => {
    let error = {};
    let username = component.authForm.controls["username"];
    expect(username.valid).toBeFalsy();

    let password = component.authForm.controls["password"];
    expect(password.valid).toBeFalsy();

    error = username.errors || {};
    expect(error["required"]).toBeTruthy();

    error = password.errors || {};
    expect(error["required"]).toBeTruthy();

    username.setValue("admin");
    error = username.errors || {};
    expect(error["required"]).toBeFalsy();

    password.setValue("password");
    error = password.errors || {};
    expect(error["required"]).toBeFalsy();
  });

  it("should have method success login()", () => {
    component.authForm.value.username = "admin";
    component.authForm.value.password = "admin";
    component.onSubmit();
  });

  it("should not save session storage if response not null ", () => {
    const token: string = "odqodgqfdg9qtf83yf0yfy0ycyq0cyqc";
    sessionStorage.setItem("token", token);
    expect(sessionStorage.getItem("token")).toEqual(
      "odqodgqfdg9qtf83yf0yfy0ycyq0cyqc"
    );
    sessionStorage.clear();
    expect(sessionStorage.getItem("token")).toEqual(null);
  });
});
```

Solution with `spyOn`

```ts
it("should have method success login()", fakeAsync(() => {
  const spy = spyOn(authService, "login") // authService (DI) | login (method in service)
    .and.callThrough()
    .and.callFake((): Observable<LoginToken> => {
      return from([mockLoginResponse]);
    });
  component.authForm.controls["username"].setValue("admin");
  component.authForm.controls["password"].setValue("admin");
  fixture.debugElement
    .query(By.css("form"))
    .triggerEventHandler("ngSubmit", null);
  component.onSubmit();
  fixture.detectChanges();
  tick(500);
  expect(spy).toHaveBeenCalled();
}));
```

> Challenge trainee
