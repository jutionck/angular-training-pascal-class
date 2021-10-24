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

Generate service `ng generate service demo/todo/services/todo`

```ts
@Injectable()
export class TodoService {
  private todos: Todo[];
  private storage: Storage = sessionStorage;

  constructor(private readonly session: SessionService) {}

  findAll(): Todo[] {
    const todoValue: string = this.storage.getItem(TODO_LIST) as string;
    try {
      const todos: Todo[] = todoValue
        ? JSON.parse(todoValue)
        : [
            {
              id: 1,
              name: "Makan",
              isDone: true,
            },
          ];
      return (this.todos = todos);
    } catch (error) {
      console.log(error);
    }
  }
}
```

Buka `todo.component.ts` kemudian modifikasi menjadi

```ts
ngOnInit(): void {}
```

Buka `todo.component.html` kemudian modifikasi menjadi

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

Buka `todo-list.component.ts` kemudian modifikasi menjadi

```ts
todos: Todo[] = [];
  message?: AlertMessage; // buat optional karena belum tentu ada

  constructor(
    private readonly session: SessionService,
    private readonly todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todos = this.todoService.findAll()
  }

  ngOnChanges(): void {
    const message: string = this.session.getFlash();
    if (message) {
      this.message = JSON.parse(message)
    }
  }

  onCheckTodo(todo: Todo): void { }

  onSelectTodo(todo: Todo): void { }

  onDeleteTodo(todo: Todo): void { }
```

Buka `todo-list.component.html` kemudian modifikasi menjadi

```html
<ng-container *ngIf="message">
  <div class="alert {{ message.status ? 'alert-' + message.status : '' }}">
    {{ message.text }}
  </div>
</ng-container>
<div class="card shadow">
  <div class="card-body">
    <h5 class="card-title">Todo List</h5>
    <ng-container *ngIf="todos.length > 0; else emptyTodos">
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
    </ng-container>
    <ng-template #emptyTodos>
      <p>Data kosong</p>
    </ng-template>
  </div>
</div>
```

> Sampai sini tahap `findAll` berhasil
>
> Untuk melakukan edit data, beritahu trainee tentang `route query param` terlebih dahulu

## PART Todo Service With Observable

> 1. Sebelum masuk ke `Todo Service` akan dibahas terlebih dahulu tentang `Subject` pada `Observable`
> 2. Masih ingat materi `typescript`, kita akan menggunakannya yang sudah menggunakan `observable` tetapi pada part itu belum di ajarkan namanya `subject`
> 3. Untuk `subject` bisa pada saat praktik service saja
> 4. Subject sama halnya seperti observer, hanya dia bisa multi observable
> 5. Generate service `ng generate service demo/todo/services/todo`

Buka `todo.service.ts`

```ts
const TODO_LIST: string = 'todos';

@Injectable()
export class TodoService {

  private todos: Todo[];
  private storage: Storage = sessionStorage;

  constructor(
    private readonly session: SessionService,
    private todoSubject: Subject<boolean> = new Subject<boolean>();
  ) { }

  findAll(): Observable<Todo[]> {
    return new Observable((observer: Observer<Todo[]>) => {
      const todoValue: string = this.storage.getItem(TODO_LIST);
      try {
        const todos: Todo[] = todoValue ? JSON.parse(todoValue) : [];
        observer.next(todos);
      } catch (error) {
        observer.error(new Error('Unable to parse todo data'))
      }
    });
  }

  findById(id: number): Observable<Todo> {
    return new Observable<Todo>((observer: Observer<Todo>) => {
      const todoValue: string = this.storage.getItem(TODO_LIST);
      try {
        const todos: Todo[] = todoValue ? JSON.parse(todoValue) : [];
        const todo: Todo = todos.find(todo => todo.id === id);
        observer.next(todo);
      } catch (error) {
        observer.error(new Error('Unable to parse todo list data'))
      }
    })
  }

  notify(): Observable<boolean> {
    return this.todoSubject.asObservable();
  }
}
```
