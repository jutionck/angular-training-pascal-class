# Dependcy Injection and Service

## Teori

> Dependency injection merupakan `service` yang di butuhkan `class` untuk menjalankan fungsinya.
>
> Dependecy Injection atau `DI` dapat di `inject` kedalam sebuah component yang membutuhkan
>
> Adanya `DI` kita dapat melakukan komunikasi ke semua `component` tanpa memperdulikan dia dalam `module` mana

## PART Session Service

> Buat service `sesionService` dengan cara `ng generate service shared/services/session`
>
> Service ini berfungsi sebagai pengganti session storage yang sudah ada sebelumnya

Buka `session.service.ts`

```ts
@Injectable()
export class SessionService {
  private readonly storage: Storage = sessionStorage;

  /**
   * Kita akan membuat sebuah session service misalnya Flash
   * Dimana ketika set maka akan masuk ke session stroage,
   * ketika get setelah return maka value-nya hilang dari session
   */

  public getFlash(): string {
    const message: string = this.storage.getItem("flash") as string;

    // ketika sudah get maka hapus key nya
    this.storage.removeItem("flash");
    return message;
  }

  public setFlash(value: string): void {
    this.storage.setItem("flash", value);
  }
}
```

> Jika sudah buat service nya jangan lupa di `shared.module` kita provide service nya
> Karena `service` maka yang di deklarasikan di module adalah `providers`

Buka `shared.module.ts`

```ts
const services = [SessionService];

providers: [...services];
```

## PART Dependecy Injection

> Untuk menginject `DI` di sebuah component bisa di taruh pada `constructor`

Buka `todo-list.component.ts`

```ts
constructor(
    private readonly session: SessionService
  ) { }
```

> 1. Flash ini nantinya akan cek apakah ada atau tidak
> 2. Maka dari itu kita buat sebuah `model` untuk menangkap `message` nya
> 3. Buat folder baru dengan nama `models` di `shared`
> 4. Buat file dengan nama `alert-message.model.ts`

Buka `alert-message.model.ts`

```ts
export interface AlertMessage {
  status: "primary" | "success" | "info" | "danger" | "warning";
  text: string;
}
```

Buka `todo-list.component.ts`

```ts
ngOnInit(): void {

    const message: string = this.session.getFlash();
    if (message) {
      this.message = JSON.parse(message)
    }
  }
```

Buka `todo-list.component.html`

```html
<ng-container *ngIf="message">
  <div class="alert {{ message.status ? 'alert-' + message.status : '' }}">
    {{ message.text }}
  </div>
</ng-container>
```

> Kita lakukan inject kembali pada `todo-form.component.ts`

Buka `todo-form.component.ts`

```ts
constructor(
    private readonly session: SessionService
  ) { }


  onSubmitTodo(): void {
    console.log(this.todoForm.value);
    this.todoChange.emit(this.todoForm.value)
    this.todoForm.reset();
    this.session.setFlash(`Todo ${this.todoForm.value['name']} saved`);
  }
```

> Silahkan cek di browser dan lihat bagian `console` dan `application`
>
> Hasilnya pasti `null` karena kita taruh nya di `ngOnInit`
>
> `ngOnInit` hanya di panggil satu kali ketika component itu di load

Untuk mengatasi masalah tersebut kita taruh di lifecycle `ngOnChanges`

Buka kembali `todo-list.component.ts` implement `ngOnChanges` dan pindahkan baris ini ke `ngOnChanges`

```ts
this.session.setFlash(`Todo ${this.todoForm.value["name"]} saved`);
```

Kemudian buka kembali `todo-form.component.ts` karena `sessionService` itu menerima `message` berupa interface maka cara implement ny adalah seperti berikut :

```ts
onSubmitTodo(): void {
    console.log(this.todoForm.value);
    const todo: Todo = this.todoForm.value
    this.todoChange.emit(todo)
    this.todoForm.reset();
    const message: AlertMessage = { status: 'success', text: `Todo ${todo.name} saved` }
    this.session.setFlash(JSON.stringify(message));
  }
```

## PART Todo Service

Generate service terlebih dahulu `ng generate service demo/todo/services/todo`

### Todo Get All

Buka `todo.service.ts` kita akan membuat method pertama yaitu `getAll`

```ts
@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private storage: Storage = sessionStorage;

  getAll(): Todo[] {
    const todoValue: string = this.storage.getItem(TODO_LIST);
    try {
      const todos: Todo[] = todoValue ? JSON.parse(todoValue) : [];
      this.todos = todos;
      this.updateSessionStorage();
      return todos;
    } catch (error) {
      console.error(error);
    }
  }

  private updateSessionStorage(): void {
    this.storage.setItem(TODO_LIST, JSON.stringify(this.todos));
  }
}
```

Setelah service terbuat selanjutnya buka `todo-list.component.ts` karena kita sudah menerapkan `DI` dan `service` jadi tidak membutuhkan `todo.component.ts` lagi sebagai perantara komunikasi.

```ts
export class TodoListComponent implements OnInit {
  constructor(private readonly todoService: TodoService) {}
  ngOnInit(): void {
    this.getAllTodos();
  }

  todos: Todo[] = [];

  getAllTodos(): void {
    this.todos = this.todoService.getAll();
  }

  onCheckTodo(todo: Todo): void {}

  onSelectTodo(todo: Todo): void {}
  onDeleteTodo(todo: Todo): void {}
}
```

Selanjutnya buka `todo-list.component.html`

```html
<div class="card shadow">
  <div class="card-body">
    <h5 class="card-title">Todo List</h5>
    <ul class="list-group">
      <li *ngFor="let todo of todos" class="list-group-item">
        <div class="form-check">
          <input
            class="form-check-input mt-0"
            type="checkbox"
            id="{{ todo.id }}_checkbox"
            [value]="todo.id"
            [checked]="todo.isDone"
            (click)="onCheckTodo(todo)"
            aria-label="Checkbox for following text input"
          />
          <label for="{{ todo.id }}_checkbox" class="form-check-label">
            {{ todo.name }}
          </label>
          <button
            class="btn btn-link btn-sm float-end"
            (click)="onDeleteTodo(todo)"
          >
            <i class="fas fa fa-trash"></i>
          </button>
          <button
            class="btn btn-link btn-sm float-end"
            (click)="onSelectTodo(todo)"
          >
            <i class="fas fa fa-edit"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</div>
```

Buka `todo.component.html` dan ubah menjadi

```html
<div class="row p-3">
  <div class="col">
    <app-todo-list></app-todo-list>
  </div>
  <div class="col">
    <app-todo-form></app-todo-form>
  </div>
</div>
```

### PART Todo OnCheckTodo

Masih di `todo.service.ts` tambahkan method baru `checkedTodo`

```ts
checkedTodo(todo: Todo): void {
    try {
      this.todos.forEach(item => {
        if (item.id === todo.id) {
          item.isDone = !item.isDone
          this.updateSessionStorage()
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
```

Buka `todo-list.component.ts`

```ts
onCheckTodo(todo: Todo): void {
    this.todoService.checkedTodo(todo);
  }
```

> Pada part ini bisa di jadikan `challenge` untuk trainee kemudian presentasikan

### PART Todo Delete

Masih pada `todo.service.ts` tambahkan method baru `deleteTodo`

```ts
deleteTodo(id: number): void {
    try {
      const todoId: number = this.todos.findIndex(item => item.id == id);
      this.todos.splice(todoId, 1);
      this.updateSessionStorage();
    } catch (error) {
      console.error(error)
    }
  }
```

Buka kembali `todo-list.component.ts`

```ts
onDeleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo.id)
  }
```

### Todo Save Todo

Buka kembali `todo.service.ts` tambahkan method baru `saveTodo` pada method ini terdapat fungsi `create` dan `update`

```ts
saveTodo(todo: Todo): void {
    try {
      if (!todo.id) {
        todo.id = this.todos.length < 1 ? 1 : this.todos[this.todos.length - 1].id + 1;
        this.todos.push(todo);
      } else {
        this.todos.forEach((item, index) => {
          if (item.id === todo.id) {
            this.todos.splice(index, 1, todo)
          }
        })
      }
      this.updateSessionStorage();
    } catch (error) {
      console.error(error);
    }
  }
```

Selanjutnya buka `todo-form.component.ts` kemudian modifikasi menjadi seperti ini

```ts
export class TodoFormComponent implements OnInit {
  todo?: Todo;
  message?: AlertMessage;
  todoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    isDone: new FormControl(false),
    subTodos: new FormArray([]),
  });

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {}

  setFormValue(): void {
    if (this.todo) {
      this.todoForm.setValue(this.todo);
    }
  }

  onSubmitTodo(): void {
    const todo: Todo = this.todoForm.value;
    this.todoService.saveTodo(todo);
    this.message = {
      status: "success",
      text: `Todo ${todo.name} berhasil tersimpan`,
    };
    this.todoForm.reset();
  }

  // validasi form
  isFieldValid(fieldName: string, parent?: AbstractControl): string {
    const control: AbstractControl = this.todoForm.get(
      fieldName
    ) as AbstractControl;

    if (parent) {
      parent = control;
    }

    if (control && control.touched && control.invalid) {
      return "is-invalid";
    } else if (control && control.valid) {
      return "is-valid";
    } else {
      return "";
    }
  }

  //form array
  getSubTodo(): any[] {
    const subTodos: FormArray = this.todoForm.get("subTodos") as FormArray;

    return subTodos.controls;
  }

  addTodo(): void {
    const subs: FormArray = this.todoForm.get("subTodos") as FormArray;
    subs.push(
      new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        isDone: new FormControl(false),
      })
    );
  }
}
```

Buka `todo-form.component.html`

```html
<div class="card shadow">
  <ng-container *ngIf="message">
    <div class="alert {{ message.status ? 'alert-' + message.status : '' }}">
      {{ message.text }}
    </div>
  </ng-container>

  <div class="card-body">
    <h5 class="card-title">Todo Form</h5>
    <form action="" [formGroup]="todoForm" (ngSubmit)="onSubmitTodo()">
      <div class="input-group mb-3">
        <div class="input-group-text">
          <input
            class="form-check-input mt-0"
            type="checkbox"
            aria-label="Checkbox for following text input"
            formControlName="isDone"
          />
        </div>
        <input
          type="text"
          class="form-control {{ isFieldValid('name') }}"
          aria-label="Text input with checkbox"
          placeholder="Adding todo name"
          formControlName="name"
        />
        <button
          class="btn btn-outline-primary"
          type="submit"
          [disabled]="todoForm.invalid"
        >
          ADD
        </button>
        <div
          class="invalid-feedback"
          validation-message
          [control]="todoForm.controls['name']"
          [label]="'todo name'"
        ></div>
      </div>
      <div class="mb-3">
        <button
          type="button"
          class="btn btn-outline-primary"
          (click)="addTodo()"
        >
          Add Sub Todo
        </button>
      </div>
      <div
        class="input-group mb-3 has-validation"
        *ngFor="let control of getSubTodo(); let i = index"
      >
        <ng-container [formGroup]="control">
          <div class="input-group-text">
            <input
              class="form-check-input mt-0"
              type="checkbox"
              aria-label="Checkbox for following text input"
              formControlName="isDone"
            />
          </div>
          <input
            type="text"
            class="form-control {{ isFieldValid('name') }}"
            aria-label="Text input with checkbox"
            placeholder="Adding todo name"
            formControlName="name"
          />
          <div
            class="invalid-feedback"
            validation-message
            [control]="todoForm.controls['name']"
            [label]="'todo name'"
          ></div>
        </ng-container>
      </div>
    </form>
  </div>
</div>
```

Untuk melakukan edit data, beritahu trainee tentang `route query param` terlebih dahulu

Buka `todo.service.ts` tambahkan method baru `getTodoById`

```ts
getTodoById(id: number): Todo {
    try {
      return this.todos.find(item => item.id === id);
    } catch (error) {
      console.error(error)
    }
  }
```

Pada `todo-list.component.ts`

```ts
onSelectTodo(todo: Todo): void {
    console.log(this.todoService.getTodoById(todo.id));
  }
```

Sekarang buka `todo-form.component.ts` kita akan membuat `params` yang dimana ketika klik edit maka url akan menjadi `/demo/todos/1` `1` disini adalah `TODO_ID` yang di klik.

Jangan lupa inject `DI` baru dari `ActivatedRoute` (untuk mengambil paramter di url) dan `Router` (untuk navigasi routing)

```ts
constructor(
    private readonly todoService: TodoService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }
```

Pada bagian `ngOnInit` menjadi seperti ini :

```ts
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
```

Pada bagian `onSubmitTodo` menjadi seperti ini :

```ts
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
```

Pada bagian `todo-list.component.html` tambahkan `routerLink` pada tombol `edit`

```html
<button
  class="btn btn-link btn-sm float-end"
  (click)="onSelectTodo(todo)"
  routerLink="/demo/todos/{{ todo.id }}"
>
  <i class="fas fa fa-edit"></i>
</button>
```

Terakhir pada bagian `todo-routing.module.ts` tambahkan `path` baru

```ts
const routes: Routes = [
  {
    path: "",
    component: TodoComponent,
  },
  {
    path: ":id",
    component: TodoComponent,
  },
];
```

> Pada bagian `alert` saat `create` dan `update` bisa berikan challenge kepada trainee bagaimana membuat `alert` otomatis hilang setelah beberapa detik

## PART Todo Service With Observable

> 1. Buat module baru `ng g m demo/new-todo --route new-todos --module demo.module`
> 2. Buat component `ng g c demo/new-todo/components/new-todo-list`
> 3. Buat component `ng g c demo/new-todo/components/new-todo-form`
> 4. Buat folder baru bernama `models` dan buat interface `new-todo.model.ts`
> 5. Generate service `ng generate service demo/new-todo/services/new-todo`
> 6. Silahkan atur dan sesuaikan, untuk tampilan `copy-paste` dari `Todo` yang lama
> 7. Jangan lupa buat menu baru pada `shared header component`

### PART ALl Todo Service

Buka `new-todo.service.ts`

```ts
private readonly storage: Storage = sessionStorage;

  private createTodos(): Todo[] {
    const todos: Todo[] = [];
    todos.push({
      id: 1,
      name: 'Makan',
      isDone: false
    });

    todos.push({
      id: 2,
      name: 'Minum',
      isDone: false
    });

    this.storage.setItem('todos', JSON.stringify(todos));
    return todos;
  }

  public getAll(): Observable<Todo[]> {
    return new Observable((observer: Observer<Todo[]>) => {
      const todoValue: string = this.storage.getItem('todos') as string;
      try {
        if (!todoValue) {
          const todos = this.createTodos();
          observer.next(todos);
        } else {
          observer.next(JSON.parse(todoValue));
        }
      } catch (error: any) {
        observer.error(error.message)
      }
      observer.complete();
    })
  }

  public getById(id: number): Observable<Todo> {
    return new Observable((observer: Observer<Todo>) => {
      const todoValue: string = this.storage.getItem('todos') as string;
      try {
        const todos: Todo[] = JSON.parse(todoValue);
        const todo = todos.find(item => item.id === id) as Todo;
        observer.next(todo);
      } catch (error: any) {
        observer.error(error.message)
      }
    })
  }

  public save(todo: Todo): Observable<Todo> {
    return new Observable((observer: Observer<Todo>) => {
      const todoValue: string = this.storage.getItem('todos') as string;
      try {
        const todos: Todo[] = JSON.parse(todoValue);
        todos.forEach((item, index) => {
          if (item.id === todo.id) {
            todos.splice(index, 1, todo)
          }
        })
        this.storage.setItem('todos', JSON.stringify(todos));
        observer.next(todo);
      } catch (error: any) {
        observer.error(error.message)
      }
      observer.complete();
    })
  }

  public delete(id: number): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      const todoValue: string = this.storage.getItem('todos') as string;
      try {
        const todos: Todo[] = JSON.parse(todoValue);
        const newTodo: Todo[] = todos.filter(todo => todo.id !== id);
        this.storage.setItem('todos', JSON.stringify(newTodo));
        observer.next();
      } catch (error: any) {
        observer.error(error.message)
      }
      observer.complete();
    })
  }
```

### PART Todo List Component

Buka `new-todo-list.component.ts`

```ts
todos: Todo[] = [];
  loading: boolean = false;
  subcriber: Observer<any>;

  constructor(
    private readonly todoService: NewTodoService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.subcriber = {
      next: (todos) => this.todos = todos,
      error: console.error,
      complete: () => this.loading = false
    }

    this.loading = true;
    this.todoService.getAll()
      .pipe(delay(1000))
      .subscribe(this.subcriber)
  }

  onCheckTodo(todo: Todo): void {
    todo.isDone = !todo.isDone;
    this.subcriber = {
      next: (todo) => console.log('todo updated'),
      error: console.error,
      complete: () => this.loading = false
    }

    this.loading = true;
    this.todoService.save(todo)
      .pipe(delay(1000))
      .subscribe(this.subcriber)
  }

  onDeleteTodo(id: number): void {
    this.subcriber = {
      next: (todo) => {
        console.log('todo deleted')
        this.todos = todo;
      },
      error: console.error,
      complete: () => this.loading = false
    }

    this.loading = true;
    this.todoService.delete(id)
      .pipe(delay(1000), switchMap(() => this.todoService.getAll()))
      .subscribe(this.subcriber)

  }

  onSelectTodo() { }
```

### PART Todo Form Component

Buka `new-todo-routing.module.ts`

```ts
const routes: Routes = [
  {
    path: "",
    component: NewTodoComponent,
  },
  {
    path: ":id",
    component: NewTodoComponent,
  },
];
```

Buka `new-todo-list.component.html` modifikasi pada tombol `edit`

```html
<a
  class="btn btn-link btn-sm float-end"
  [routerLink]="['/', 'demo', 'new-todos', todo.id]"
>
  <i class="fas fa fa-edit"></i>
</a>
```

Buka `new-todo-form.component.ts`

```ts
message?: AlertMessage;
  loading: boolean = false;
  todoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    isDone: new FormControl(false),
    subTodos: new FormArray([])
  })
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly todoService: NewTodoService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.pipe(
      map(params => params.id),
      delay(2000),
      switchMap((id: string) => {
        if (!id) return EMPTY
        else return this.todoService.getById(+id);
      })
    )
      .subscribe((todo: Todo) => {
        if (todo) {
          this.todoForm.setValue(todo);
        }
      }, console.error,
        () => this.loading = false
      )
  }

  onSubmitTodo(): void {
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

  addTodo(): void {
    const subs: FormArray = this.todoForm.get('subTodos') as FormArray;
    subs.push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      isDone: new FormControl(false),
    }))
  }
```

Uji coba di browser

Hasil di `console` harusnya :

```text
core.js:4442 ERROR Error: Must supply a value for form control with name: 'subTodos'.
    at forms.js:3929
    at forms.js:3876
    at Array.forEach (<anonymous>)
    at FormGroup._forEachChild (forms.js:3876)
    at FormGroup._checkAllValuesPresent (forms.js:3927)
    at FormGroup.setValue (forms.js:3727)
    at SafeSubscriber.activatedRoute.params.pipe.subscribe.loading [as _next] (new-todo-form.component.ts:42)
    at SafeSubscriber.__tryOrUnsub (Subscriber.js:183)
    at SafeSubscriber.next (Subscriber.js:122)
    at Subscriber._next (Subscriber.js:72)
```

Kenapa hal itu terjadi ? karena kita menggunakan `FormArray` jadi `subTodos` tidak ke load

Solusinya adalah buka kembali `new-todo-form.component.ts` modifikasi menjadi

```ts
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

  addTodo(todo?: Todo): void {
    const subs: FormArray = this.todoForm.get('subTodos') as FormArray;
    subs.push(new FormGroup({
      id: new FormControl(todo ? todo.id : null),
      name: new FormControl(todo ? todo.name : null, [Validators.required, Validators.minLength(3)]),
      isDone: new FormControl(todo ? todo.isDone : false),
    }))
  }
```
