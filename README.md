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

Open `app.component.spec.ts` :

#### Common Matcher

1. `toBe()` :
   > _expect the actual value to be === to the expected value. Example : `expect(thing).toBe(realThing);`_

```typescript
describe("A suite is just a function", () => {
  it("and so is a spec", () => {
    const a = true;
    expect(a).toBe(true);
  });
});
```

2. `not: matchers` :
   > _expect the negative case_

```typescript
describe('The "toBe" matcher compares with ===', () => {
  it("and has a positive case", () => {
    expect(true).toBe(true);
  });

  it("and has a negative case", () => {
    expect(false).not.toBe(true);
  });
});
```

3. `toEqual()` :

   > _Use .toEqual to compare recursively all properties of object instances (also known as "deep" equality). It calls Object.is to compare primitive values, which is even better for testing than === strict equality operator._

```typescript
describe('The "toBeEqual" matcher object assignment', () => {
  const person = {
    name: "Jution",
    age: 25,
    address: "Jakarta Barat",
  };

  it("object assignment", () => {
    expect(person).toEqual({
      name: "Jution",
      age: 25,
      address: "Jakarta Barat",
    });
  });
});
```

#### Truthiness Matcher

Example :

```typescript
describe("The Truthiness", () => {
  it("test null", () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  it("test zero", () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });
});
```

#### Number Matcher

Example :

```typescript
describe("The Number Matcher", () => {
  it("two plus two", () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3); // menjadi lebih besar dari
    expect(value).toBeGreaterThanOrEqual(3.5); // menjadi lebih besar dari atau setara
    expect(value).toBeLessThan(5); // menjadi lebih kurang dari
    expect(value).toBeLessThanOrEqual(4.5); // menjadi kurang dari atau setara
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  it("adding floating point numbers", () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);           This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });
});
```

#### String Matcher

Example :

```typescript
describe("The String Macther", () => {
  it("there is no 1 in 2345", () => {
    expect("2345").not.toMatch(/1/);
  });
  it('but there is a "camp" in Enigmacamp', () => {
    expect("Enigmacamp").toMatch(/camp/); //case sensitive
  });
});
```

#### Array Matcher

Example :

```typescript
describe("The Array Matcher", () => {
  const programLanguages = [
    "Java",
    "JavaScript",
    "Kotlin",
    "TypeScript",
    "Go",
    "Python",
    "Ruby",
    "R",
    "Dart",
  ];
  it("the program language list has Go on it", () => {
    expect(programLanguages).toContain("Go");
  });
});
```

### Part Testing Asynchronous Code

Example :

```typescript
describe("The Testing Asynchronous Code", () => {
  describe("#callbacks", () => {
    function fetchData(callback) {
      setTimeout(() => {
        callback("Enigmacamp");
      }, 1000);
    }

    it("the data is Enigmacamp", () => {
      function callback(data) {
        expect(data).toBe("Enigmacamp");
      }
      fetchData(callback);
    });

    // solution
    it("the data is Enigmacamp with done", (done) => {
      function callback(data) {
        expect(data).toBe("Enigmacamp");
        done();
      }
      fetchData(callback);
    });
  });

  describe("#promise", () => {
    function fetchData() {
      return new Promise((resolve) => {
        resolve("Enigmacamp");
      });
    }

    it("the data is Enigmacamp", () => {
      return fetchData().then((data) => {
        expect(data).toBe("Enigmacamp");
      });
    });
  });

  // chalenge change with async/await
});
```

> _Challenge, change code using async/await_

> Jawaban :

```typescript
describe("#async/await", () => {
  function fetchData() {
    return new Promise((resolve, reject) => {
      try {
        resolve("Enigmacamp");
      } catch {
        reject("error");
      }
    });
  }

  it("the data is Enigmacmap", async () => {
    await fetchData().then((data) => {
      expect(data).toBe("Enigmacamp");
    });
  });
});
```

### Part More Than Practice

1. `toBeDefined() and toBeUndefined()` :
   > _Use .toBeDefined to check that a variable is not undefined._

```typescript
describe("The toBeDefined and toBeUndefined check that a variable is not undefined", () => {
  let number = 10;
  let number2;

  it('there is a number variable has initialize "10" ', () => {
    expect(number).toBeDefined();
  });

  it("there is a number2 variable has not initialize", () => {
    // expect(number2).toBeUndefined();
    expect(number2).not.toBeDefined();
  });

  describe("AppComponent", () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });

    it("defined component variable in AppComponent", () => {
      expect(component).toBeDefined();
    });
  });
});
```

2. `toBeTrue(), toBeFalse()` :
   > _handles both a primitive boolean type, use .toBeTrue if value to be true, use .toBeFalse if value to be false and use .toBeTruthy when you don't care what a value is, you just want to ensure a value is true in a boolean context._

Open `app.component.ts` and add script :

```typescript
isValid(): boolean {
    return true;
  }
```

```typescript
describe("The toBeTrue, toBeFalse, toBeTruthy", () => {
  const a: boolean = true;
  const b: boolean = false;

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it("check variable a & b and function isValid", () => {
    expect(a).toBeTrue();
    expect(b).toBeFalse();
    expect(component.isValid).toBeTruthy();
  });
});
```

3. `toBeFalsy() :`
   > _Use .toBeFalsy when you don't care what a value is, you just want to ensure a value is false in a boolean context_

Open `app.component.ts` and add script :

```typescript
numberCheck(a: number): boolean {
    if (a < 10) {
      return true
    }
    else {
      return false
    }
  }
```

```typescript
describe("The toBeFalsy and toBeTruthy", () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it("have a function numberCheck, with arg 5", () => {
    // expect(component.numberCheck(5)).toBeFalsy(); //fail
    expect(component.numberCheck(5)).toBeTruthy();
  });

  it("have a function numberCheck, with arg 10", () => {
    expect(component.numberCheck(10)).toBeFalsy();
    // expect(component.numberCheck(10)).toBeTruthy(); //fail
  });
});
```

#### Others Matcher

1. `toBeCloseTo(expected, precisionopt)` :
   > _expect the actual value to be within a specified precision of the expected value._

```typescript
describe('The "toBeCloseTo" matcher specified precision of the expected value', () => {
  const a = 0.2;
  const b = 0.1;
  const c = a + b; //0.30000000000000004
  const expected = 0.3;
  it("adding works sanely with simple decimals", () => {
    expect(c).toBe(expected); // fail
  });

  // solution use toBeCloseTo
  it("adding works sanely with simple decimals", () => {
    expect(c).toBeCloseTo(expected, 5); // fail
  });
});
```

> _**toBeCloseTo(expected, precision)** default **precison** is 2_

### PART Spies

1. Create file `increment-decrement.service.ts` and add script like below:

```typescript
@Inject
export class IncrementDecrementService {
  value: number = 0;
  message!: string;

  increment() {
    if (this.value < 15) {
      this.value += 1;
      this.message = "";
    } else {
      this.message = "Maximum reached!";
    }
  }

  decrement() {
    if (this.value > 0) {
      this.value -= 1;
      this.message = "";
    } else {
      this.message = "Minimum reached!";
    }
  }
}
```

2. Open `app.component.ts` and add script like below :

```typescript
export class AppComponent {
  title = "introduction-angular";

  constructor(public incrementDecrementService: IncrementDecrementService) {}

  increment() {
    this.incrementDecrementService.increment();
  }

  decrement() {
    this.incrementDecrementService.decrement();
  }
}
```

3. Open `app.component.spec.ts` and modify script like below :

```typescript
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { IncrementDecrementService } from "./increment-decrement.service";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let incrementDecrementService: IncrementDecrementService;
  let incrementSpy;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [IncrementDecrementService],
      }).compileComponents();

      fixture = TestBed.createComponent(AppComponent);
      debugElement = fixture.debugElement;

      incrementDecrementService = debugElement.injector.get(
        IncrementDecrementService
      );
      incrementSpy = spyOn(
        incrementDecrementService,
        "increment"
      ).and.callThrough();
    })
  );

  it("should call increment on the service", () => {
    debugElement
      .query(By.css("button.increment"))
      .triggerEventHandler("click", null);

    expect(incrementDecrementService.value).toBe(1);
    expect(incrementSpy).toHaveBeenCalled();
  });

  it("should increment in template", () => {
    debugElement
      .query(By.css("button.increment"))
      .triggerEventHandler("click", null);

    fixture.detectChanges();

    const value = debugElement.query(By.css("h1")).nativeElement.innerText;

    expect(value).toEqual("1");
  });

  it("should stop at 15 and show maximum message", () => {
    incrementDecrementService.value = 15;
    debugElement
      .query(By.css("button.increment"))
      .triggerEventHandler("click", null);

    fixture.detectChanges();

    const value = debugElement.query(By.css("h1")).nativeElement.innerText;
    const message = debugElement.query(By.css("p.message")).nativeElement
      .innerText;

    expect(value).toEqual("15");
    expect(message).toContain("Maximum");
  });
});
```

### PART 2 Introduction Unit Testing

> _Ketika kita membuat sebuah project angular, sebenarnya kita sudah terinstall unit testing bawaan nya yaitu **karma**, bisa diperlihatkan pada sebuah project trainee terdapat file bernama `karma.conf.json`_

> _Untuk melakukan testing pun bisa langsung dipraktekkan dengan cara mengetikkan `ng test` atau dapat melalui command npm dengan menjalankan `npm run test` silahkan cek pada file `package.json` bagian **script** `"test": "ng test",`_

> _Ketika melakukan npm run test akan otomatis browser chrome akan terbuka dan akan melihat hasil testing dari `jasmine framework`. `karma.conf.js` itu sendiri merupakan test runner yang digunakan oleh **jasmine**_

> _Selanjutnya adalah kita akan melakukan konfigurasi pada file `package.json`_

1. Open `package.json` and add some scripts `test:coverage` as shown below:

```json
"scripts": {
    "ng": "ng",
    "start": "ng serve --open",
    "build": "ng build",
    "test": "ng test",
    "test:coverage": "ng test --no-watch --code-coverage",
    "lint": "ng lint",
    "e2e": "ng e2e"
  }
```

> _Uji coba dengan mengetikkan ini di terminal VS Code `npm run test:coverage`, ketika command tersebut di jalankan akan otomatis membuat sebuah direktori **coverage** yang di dalamnya ada sebuah file `index.html` silahkan buka di browser._

> _Jelaskan bahwa ketika melukan command test file yang terbaca adalah file yang mempunyai nama file `.spec.ts`_

2. Open `app.component.spec.ts`, if not exist, create a file `app.component.spec.ts` and add script:

```typescript
describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as lifecycle 'ngOnInit''`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.ngOnInit).toBeTruthy();
  });
});
```

> _Penjelasan code diatas adalah :_ <br> > _`describe` merupakan sebuah function yang menerima 2 buah parameter, pertama adalah `string` biasanya di buat untuk mendeskripsikan apa yang akan di tes, kemudian kedua adalah function, biasanya sebuah `arrow function` contohnya adalah :_

```typescript
describe("Suite description", () => {
  /* … */
});
```

> _bisa juga seperti ini, karena `describe` dapat `nested` :_

```typescript
describe("Suite description", () => {
  describe("One aspect", () => {
    /* … */
  });
  describe("Another aspect", () => {
    /* … */
  });
});
```

> _`beforeEach(async ()` merupakan sebuah function untu menangani asynchrounus funcition_ > _Selanjutnya adalah function `it` adalah sebuah function yang menerima dua buah parameter sama seperti `describe`, contoh kode ny adalah :_

```typescript
describe("Suite description", () => {
  it("Spec description", () => {
    /* … */
  });
  /* … more specs …  */
});
```

> _Terakhir adalah `assert` dengan di kode di tulis dengan :_

```typescript
expect(app).toBeTruthy();
```

> _**Assert** masih banyak lagi ya._

### PART Unit Testing For Component

1. Create unit testing `app/app.component.spec.ts`

```typescript
export class AppComponent {
  title = "introduction-angular";

  // example Statement Coverage
  /**
   * jumlah script function sum di bawah ini adalah 5 baris
   * contoh: kita mengisi number1 = 10, number2 = 15
   * maka baris yang di execute adalah = 1,2,3,5
   * perhitunganya adalah (jumlah execute / total script) x 100
   * hasilnya adalah (4/5) x 100 = 80%
   */
  sum(number1: number, number2: number): number {
    const result = number1 + number2;
    if (result > 0) console.log("Positve", result);
    else console.log("Negative", result);

    return result;
  }
}
```

```typescript
describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it("should create the app", () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'introduction-angular'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("introduction-angular");
  });

  it(`should have a function sum(5, 6), result 11`, () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.sum(5, 6)).toEqual(11);
  });
});
```

2. Create unit testing `app/template/layouts/template-layout.component.spec.ts`

```typescript
describe("TemplateLayoutComponent", () => {
  let component: TemplateLayoutComponent;
  let fixture: ComponentFixture<TemplateLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TemplateLayoutComponent] });
    fixture = TestBed.createComponent(TemplateLayoutComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeDefined();
  });

  // nativeELement
  it("should have <app-header>", () => {
    // buat variabel untuk deteksi tag html
    const templateElement: HTMLElement = fixture.nativeElement;
    const appHeader = templateElement.querySelector("app-header");
    expect(appHeader).toBeTruthy();
  });
});
```

Modify `app/template/layouts/template-layout.component.html` with script :

```html
<app-header></app-header>

<div class="container">
  <div class="row">
    <div class="col-12">
      <ng-content></ng-content>
    </div>
  </div>
</div>
```

Open again `app/template/layouts/template-layout.component.spec.ts` and modify like above :

```typescript
describe("TemplateLayoutComponent", () => {
  let component: TemplateLayoutComponent;
  let fixture: ComponentFixture<TemplateLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TemplateLayoutComponent] });
    fixture = TestBed.createComponent(TemplateLayoutComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeDefined();
  });

  // nativeELement
  it("should have <app-header>", () => {
    // buat variabel untuk deteksi tag html
    const templateElement: HTMLElement = fixture.nativeElement;
    const appHeader = templateElement.querySelector("app-header");
    expect(appHeader).toBeTruthy();
  });
});
```

> _Challenge trainee dengan membuat spec test pada file di bawah ini:_
>
> 1. Create unit testing `app/template/components/header/header.component.spec.ts`
> 2. Create unit testing `app/pages/pages.component.spec.ts`
> 3. Create unit testing `app/pages/landing/components/carousel/carousel.component.spec.ts`
> 4. Create unit testing `app/pages/landing/components/landing/landing.component.spec.ts`

3. Create unit testing `app/pages/todos/components/todo-list/todo-list.component.spec.ts`

```typescript
describe("TodoListCoomponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TodoListComponent] });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector("h1");
  });

  // That test fails, because createComponent() doesn't bind data;
  it("should display original title", () => {
    expect(h1.textContent).toContain(component.title);
  });
});
```

> _Jalankan, akan fail. Solusinya adalah menggunakan `detectChanges()`_
> Open again `app/pages/todos/components/todo-list/todo-list.component.spec.ts` add script like this :

```typescript
it("no title in the DOM after createComponent()", () => {
  expect(h1.textContent).toEqual("");
});

// so, solution: use detectChanges()
it("should display original title after detectChanges()", () => {
  fixture.detectChanges();
  expect(h1.textContent).toContain(component.title);
});
```

### PART Unit Testing For Directive

1. Create unit testing `shared/directives/bs-button/bs-button.directive.spec.ts`

```html
<div class="row">
  <h1>My Todo Form</h1>

  <div class="alert alert-info" *ngIf="loading">
    Menyimpan data, silahkan tunggu...
  </div>

  <form action="" [formGroup]="todoForm">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">V</span>
      <input
        type="text"
        class="form-control"
        placeholder="Task name"
        formControlName="label"
      />
      <button
        type="button"
        appBsButton
        color="dark"
        buttonStyle="outline"
        (click)="addTask()"
      >
        ADD
      </button>
    </div>
  </form>
</div>
```

```typescript
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BsButtonDirective } from "src/app/shared/directives/bs-button/bs-button.directive";
import { TodoFormComponent } from "./todo-form.component";

describe("TodoFormComponent", () => {
  let fixture: ComponentFixture<TodoFormComponent>;
  let bsBtn: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [BsButtonDirective, TodoFormComponent],
    }).createComponent(TodoFormComponent);

    // initial binding
    fixture.detectChanges();

    // all element with an attached BsButtonDirective
    bsBtn = fixture.debugElement.queryAll(By.directive(BsButtonDirective));
  });

  // button tests
  it("should have one appBsButton elements", () => {
    expect(bsBtn.length).toBe(1);
  });
});
```

> _Challenge trainee again_
>
> 1. Create unit testing `shared/directives/bs-input/bs-input.directive.spec.ts`

### PART Unit Testing For Pipe

Create file `app/shared/pipes/custome-date.pipe.spec.ts` and add script this:

```typescript
describe("CustomDatePipe", () => {
  const date: Date = new Date();
  const customeDate: CustomeDatePipe = new CustomeDatePipe();
  const expectDate = "Tgl 28 Juni 2021";

  it("transform date with customDate", () => {
    expect(customeDate.transform(date)).toBe(expectDate);
  });
});
```

> _Challenge trainee again_
>
> 1. Create unit testing, create file `app/shared/pipes/relative-from.pipe.spec.ts`

### PART Unit Testing For Module

1. Create file `app/module.spec.ts` add script this :

```typescript
describe("Module", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        SharedModule,
        TemplateModule,
        PagesModule,
        LandingModule,
        TodoModule,
        UsersModule,
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

  it("initialize TemplateModule", () => {
    const module = TestBed.inject(TemplateModule);
    expect(module).toBeTruthy();
  });

  it("initialize PagesModule", () => {
    const module = TestBed.inject(PagesModule);
    expect(module).toBeTruthy();
  });

  it("initialize LandingModule", () => {
    const module = TestBed.inject(LandingModule);
    expect(module).toBeTruthy();
  });

  it("initialize TodoModule", () => {
    const module = TestBed.inject(TodoModule);
    expect(module).toBeTruthy();
  });

  it("initialize UsersModule", () => {
    const module = TestBed.inject(UsersModule);
    expect(module).toBeTruthy();
  });
});
```

### PART Unit Testing For Service Without HTTP Service

1. Create unit testing `app/pages/todos/service/todo.service.spec.ts`

```typescript
describe("TodoService()", () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should have method getTaskPromise()", () => {
    expect(service.getTaskPromise).toBeTruthy();
  });

  it("should have method getTaskObservable()", () => {
    expect(service.getTaskObservable).toBeTruthy();
  });

  it("should have method getTaskObservable()", () => {
    expect(service.getTaskObservable).toBeTruthy();
  });

  it("should have method watch", () => {
    expect(service.watch).toBeTruthy();
  });
});
```

> _Pada testing independent service ada `TestBed.inject(TodoService);` untuk memanggil servive dengan menggunakan `inject`_

#### Day 2

In file `app/pages/todos/service/todo.service.spec.ts` modify like this:

```typescript
describe('TodoService', () => {

  // .... ///
const mockTask: Todo = {
    id: 1,
    label: 'Task 4',
    checked: true
  };

it('should have metod setTask', () => {
    expect(service.setTask(mockTask)).toBeTruthy();
  });

}
```

### Part Unit Testing Component with FormGroup and ReacriveForm

1. Open file `app/pages/todos/component/todo-form/todo-form.component.ts` and modify script :

```typescript
describe("TodoFormComponent()", () => {
  let fixture: ComponentFixture<TodoFormComponent>;
  let bsButton: DebugElement[]; //cek semua element yang ada di html
  let component: TodoFormComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [BsButtonDirective, TodoFormComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }).createComponent(TodoFormComponent);

    // initial detecChanges;
    fixture.detectChanges();
    bsButton = fixture.debugElement.queryAll(By.directive(BsButtonDirective));

    // PART ReactiveForm
    component = fixture.componentInstance;
  });

  it("should have one appBsButon element", () => {
    expect(bsButton.length).toBe(1);
  });

  // PART ReactiveForm
  describe("#ReactiveForm", () => {
    it("label field validity", () => {
      let error = {};
      let label = component.todoForm.controls["label"];
      expect(label.valid).toBeFalsy();

      // label field is required
      error = label.errors || {};
      expect(error["required"]).toBeTruthy();
      // set label
      // toBeFalse => cek value
      // toBeFalsy => cek variable
      label.setValue("Reading");
      error = label.errors || {};
      expect(error["required"]).toBeFalsy();
      expect(error["minlength"]).toBeFalsy();
    });
  });
});
```

Open file `todo-form.component.spec.ts` again and add script like this for submiting test:

```typescript
it("submiting a form emits a label", () => {
  expect(component.todoForm.valid).toBeFalsy();
  component.todoForm.controls["label"].setValue("Traveling");
  expect(component.todoForm.valid).toBeTruthy();
  // component.addTask(); -> Component with Dependency
  expect(component.outputTask).toBeTruthy();
});
```

### PART fakeAsync and Tick

> _Sebelum masuk sini, silahkan tambahkan dahulu di beberapa `spec.ts` di bagian `configureTestingModule` => `schemas: [ CUSTOM_ELEMENTS_SCHEMA ]` agar di console tidak merah_

1. Create a file `app/app-async.spec.ts`
2. Modify that file :

```typescript
describe("AysncTest", () => {
  it("asynchronous test example - setTimeout", () => {
    let test: boolean = false;
    setTimeout(() => {
      console.log("running assertions");
      test = true;
      expect(test).toBeTruthy();
    }, 1000);
    // akan fail karena test bersifat async tetapi belum menerapakan fakeAsync
  });
});
```

> _Jalankan `npm run test` dan lihat pada bagian console, harusnya jika benar ada error Unchaugh expect... Karena yang di test adalah asynchronous, barulah kita menggunakan **fakeAsync** dan **tick** | perjalanan zona waktu, keduanya merupakan dependency dari `Zone.js`_

3. Modify `app/app-async.spec.ts` adding `fakeAsync` and `tick` :

```typescript
// ... //
// fakeAsync & tick => sebuah fungsi untuk perjalanan waktu
// tick ini sama seperti setTimeOut (unit test) -> mock setTimeOut
// yang mana tick ini pasti ada fakeAsync()
// tick ini gak boleh kurang dari setTimeOut, tapi bisa lebih

it("asynchronous test example - setTimeout with fakeAsync", fakeAsync(() => {
  let test: boolean = false;
  setTimeout(() => {
    console.log("running assertions setTimeOut with fakeAsync");
    test = true;
  }, 1000);
  expect(test).toBe(false);
  tick(500);
  expect(test).toBe(false);
  tick(500);
  expect(test).toBe(true);
}));
```

### PART Unit Testing For Routing

1. Create unit testing `app/pages/landings/landing-routing.module.spec.ts`

```typescript
describe("LandingRouting", () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), LandingRoutingModule],
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(LandingComponent);
    router.initialNavigation();
  });

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate([""]).then(() => {
      tick(50);
      expect(location.path()).toBe("/home");
    });
  }));
});
```

> _Challenge Time_:
>
> 1. Create unit testing `app/pages/todos/todo-routing.module.spec.ts`
> 2. Create unit testing `app/pages/users/users-routing.module.spec.ts`

4. Open file `todo-list.component.spec.ts` :

```typescript

```

### PART Unit Testing Component With Dependency

1. Create unit testing `app/pages/users/components/list/list-user.component.spec.ts`
2. Create unit testing `app/pages/todos/components/todo-form/todo-form.component.spec.ts`
3. Create unit testing `app/pages/users/components/form/form-user.component.spec.ts`

> _Code dimulai_

1. Open file `app/pages/todos/components/todo-list/todo-list.component.spec.ts` and add script:

> _The following **TodoListComponent** depends on the TodoService to showing list todo_

```typescript
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
    expect(component.tasks).toEqual([]);
  });

  it("should showing task after onInit", fakeAsync(() => {
    const mock: Todo[] = [
      {
        id: 1,
        label: "Task 1",
        checked: true,
      },
      {
        id: 2,
        label: "Task 2",
        checked: false,
      },
      {
        id: 3,
        label: "Task 3",
        checked: false,
      },
    ];
    component.ngOnInit();
    expect(component.loading).toBe(true);
    const mockTask = todoServive.getTaskObservable();
    mockTask.subscribe((tasks) => {
      // waktu tunggu 3 detik masuk sini
      component.tasks = tasks;
      expect(component.tasks).toEqual(mock);
      expect(component.tasks.length).toEqual(mock.length);
    });
    tick(3000);
  }));
});
```

> _Challenge Time:_
>
> 1. Create unit testing `app/pages/todos/components/todo-form/todo-form.component.spec.ts`

#### Day 3

### PART Unit Testing Component with Dependency (Service & HTTP Service)

1. Create unit testing `app/pages/users/components/list/list-user.component.spec.ts`

```typescript
describe("ListUserComponent", () => {
  let component: ListUserComponent;
  let userService: UserService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ListUserComponent,
        {
          provide: UserService,
        },
      ],
    });

    component = TestBed.inject(ListUserComponent);
    userService = TestBed.inject(UserService);
  });

  it("should not have user list after construction", () => {
    expect(component.users).toEqual([]);
  });

  it("should showing users after Angular calls ngOnInit with observable", () => {
    const dummyUsers = [
      {
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      },
      {
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
        avatar: "https://reqres.in/img/faces/2-image.jpg",
      },
      {
        id: 3,
        email: "emma.wong@reqres.in",
        first_name: "Emma",
        last_name: "Wong",
        avatar: "https://reqres.in/img/faces/3-image.jpg",
      },
      {
        id: 4,
        email: "eve.holt@reqres.in",
        first_name: "Eve",
        last_name: "Holt",
        avatar: "https://reqres.in/img/faces/4-image.jpg",
      },
      {
        id: 5,
        email: "charles.morris@reqres.in",
        first_name: "Charles",
        last_name: "Morris",
        avatar: "https://reqres.in/img/faces/5-image.jpg",
      },
      {
        id: 6,
        email: "tracey.ramos@reqres.in",
        first_name: "Tracey",
        last_name: "Ramos",
        avatar: "https://reqres.in/img/faces/6-image.jpg",
      },
    ];
    component.ngOnInit();
    const userList = userService.getAll(1);
    userList.subscribe((users: any) => {
      component.users = users;
      expect(component.users).toEqual(dummyUsers);
      // expect(comp.tasks.length).toEqual(tasks.length);
    });
  });
});
```

> _Challenge Time_
>
> 1. Create unit testing `app/pages/users/components/form/form-user.component.spec.ts`

### PART Unit Testing For Service with HTTP Services

1. Create unit testing `app/pages/users/service/user.service.spec.ts`

```typescript
const page = 1;
const expectedUrl = `https://reqres.in/api/users`;

describe("UserServie", () => {
  let injector: TestBed;
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    injector = getTestBed();
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // HttpTestingController#verify to make sure that there are no outstanding requests:
  // afterEach(() => {
  //   httpMock.verify();
  // });

  it("should be created", inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe("#getUsers", () => {
    it("should return an Observable<Response<User[]>>", () => {
      const dummyUsers = [
        {
          id: 1,
          email: "george.bluth@reqres.in",
          first_name: "George",
          last_name: "Bluth",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
        {
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
        {
          id: 3,
          email: "emma.wong@reqres.in",
          first_name: "Emma",
          last_name: "Wong",
          avatar: "https://reqres.in/img/faces/3-image.jpg",
        },
        {
          id: 4,
          email: "eve.holt@reqres.in",
          first_name: "Eve",
          last_name: "Holt",
          avatar: "https://reqres.in/img/faces/4-image.jpg",
        },
        {
          id: 5,
          email: "charles.morris@reqres.in",
          first_name: "Charles",
          last_name: "Morris",
          avatar: "https://reqres.in/img/faces/5-image.jpg",
        },
        {
          id: 6,
          email: "tracey.ramos@reqres.in",
          first_name: "Tracey",
          last_name: "Ramos",
          avatar: "https://reqres.in/img/faces/6-image.jpg",
        },
      ];
      userService.getAll(1).subscribe((response: any) => {
        console.log(response);
        expect(response.length).toBe(6);
        expect(response).toEqual(dummyUsers);
      });
      const request = httpMock.expectOne(`${expectedUrl}?page=${page}`);
      request.flush(dummyUsers);
      expect(request.request.method).toBe("GET");
    });
  });
});
```

2. Open file `app/pages/users/model/user.model.ts` modify become :

```typescript
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  job?: string;
}
```

3. Open the file `app/pages/users/service/user.service.spec.ts` modify become :

```typescript
const page = 1;
const expectedUrl = `https://reqres.in/api/users`;

describe("UserServie", () => {
  let injector: TestBed;
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    injector = getTestBed();
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // HttpTestingController#verify to make sure that there are no outstanding requests:
  // afterEach(() => {
  //   httpMock.verify();
  // });

  it("should be created", inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe("#getUsers", () => {
    it("should return an Observable<Response<User[]>>", () => {
      const dummyUsers = [
        {
          id: 1,
          email: "george.bluth@reqres.in",
          first_name: "George",
          last_name: "Bluth",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
        {
          id: 2,
          email: "janet.weaver@reqres.in",
          first_name: "Janet",
          last_name: "Weaver",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
        {
          id: 3,
          email: "emma.wong@reqres.in",
          first_name: "Emma",
          last_name: "Wong",
          avatar: "https://reqres.in/img/faces/3-image.jpg",
        },
        {
          id: 4,
          email: "eve.holt@reqres.in",
          first_name: "Eve",
          last_name: "Holt",
          avatar: "https://reqres.in/img/faces/4-image.jpg",
        },
        {
          id: 5,
          email: "charles.morris@reqres.in",
          first_name: "Charles",
          last_name: "Morris",
          avatar: "https://reqres.in/img/faces/5-image.jpg",
        },
        {
          id: 6,
          email: "tracey.ramos@reqres.in",
          first_name: "Tracey",
          last_name: "Ramos",
          avatar: "https://reqres.in/img/faces/6-image.jpg",
        },
      ];
      userService.getAll(1).subscribe((response: any) => {
        console.log(response);
        expect(response.length).toBe(6);
        expect(response).toEqual(dummyUsers);
      });
      const request = httpMock.expectOne(`${expectedUrl}?page=${page}`);
      request.flush(dummyUsers);
      expect(request.request.method).toBe("GET");
    });
  });

  describe("#saveUser", () => {
    it("should return an Observable<User>", () => {
      const dummyUser: User = {
        id: 0,
        first_name: "Jution",
        last_name: "Candra",
        email: "jutionck@mipdevp.com",
        avatar: "-",
        job: "Trainer",
      };
      userService.save(dummyUser).subscribe((response) => {
        expect(response.first_name).toBe("Jution");
      });
      const request = httpMock.expectOne(`${expectedUrl}`);
      expect(request.request.method).toBe("POST");
      request.flush(dummyUser);
    });
  });
});
```

### PART Code Coverage

> _Run with `npm run test:coverage` in terminal VS Code and Look at your root project now there is **coverage** directory, open `index.html` and running to browser._

### Challenge

> 1. Create unit test for login service to API
> 2. Completed all your component with unit test
