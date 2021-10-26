# HTTP Service and Interceptor

> 1. Import dahulu `HttpClientModule` di `app.module.ts`
> 2. Generate module `ng generate module auth --route auth --module app.module`
> 3. Buat directory `models` di `auth` kemudian buat file `login.model.ts`
> 4. Generate service `ng g service auth/services/auth`

## PART Layout Auth

Buka `auth.component.html` untuk membuat layout

```html
<div class="row align-items-center h-100 p-5">
  <div class="col-3 mx-auto">
    <main class="form-signin">
      <form class="m-3" [formGroup]="authForm" (ngSubmit)="onSubmit()">
        <h1 class="h3 mb-3 fw-normal text-center">
          <i class="fas fa-code fa-4x"></i> <br />
          Please sign in
        </h1>
        <div class="form-floating">
          <input
            type="text"
            class="form-control {{ isFieldValid('username') }}"
            id="floatingInput"
            placeholder="Masukkan username"
            formControlName="username"
          />
          <label for="floatingInput">Username</label>
          <div
            class="invalid-feedback"
            validation-message
            [control]="authForm.controls['username']"
            [label]="'Username'"
          ></div>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control {{ isFieldValid('password') }}"
            id="floatingPassword"
            placeholder="Masukkan password"
            formControlName="password"
          />
          <label for="floatingPassword">Password</label>
          <div
            class="invalid-feedback"
            validation-message
            [control]="authForm.controls['password']"
            [label]="'Password'"
          ></div>
        </div>
        <button
          class="w-100 btn btn-lg btn-primary mt-3"
          type="submit"
          [disabled]="authForm.invalid"
        >
          Sign in
        </button>
        <p class="mt-3 mb-3 text-muted text-center">© 2021</p>
      </form>
    </main>
  </div>
</div>
```

## PART Logic Auth

Buka `auth.module.ts` import beberapa module ini `FormsModule, ReactiveFormsModule, SharedModule` untuk service jangan lupa di provide `AuthService`

Buka `login.model.ts`

```ts
export interface Login {
  username: string;
  password: string;
}

export interface LoginToken {
  token: string;
}
```

Buka `auth.component.ts` isikan sintak di bawah ini

```ts
constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {  }

  authForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  onSubmit(): void {
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value)
        .subscribe((response: LoginToken) => {
          sessionStorage.setItem('token', response.token);
          this.router.navigateByUrl('/')
        }, console.error)
    }
  }

  isFieldValid(fieldName: string, parent?: AbstractControl): string {
    const control: AbstractControl = this.authForm.get(fieldName) as AbstractControl;

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
```

> Uji coba di browser, harusnya akan kena `CORS Origin`
>
> Untuk mengatasi masalah tersebut silahkan buat file `proxy.conf.json` di root folder

Isi `proxy.conf.json`

```json
{
  "/api": {
    "target": "https://dev.enigmacamp.com/trainings/api/",
    "logLevel": "debug",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

Buka `angular.json` lalu tambahkan ini

```json
"architect": {
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "angular-intro:build",
            "proxyConfig": "proxy.conf.json"
          },

```

Jangan lupa `restart` angular nya `npm start`

Sampai sini harusnya sudah selesai, buka `header.component.html` tambahkan ini

```html
<li class="nav-item" *ngIf="!isLoggedIn()">
  <a class="nav-link" routerLink="/auth/login">Login</a>
</li>
<li class="nav-item" *ngIf="isLoggedIn()">
  <a class="nav-link" routerLink="/auth/logout">Logout</a>
</li>
```

Buka `header.component.ts` tambahkan method baru

```ts
isLoggedIn(): boolean {
    return (sessionStorage.getItem('token') !== null)
  }
```

Jangan lupa atur route guard nya yang sudah di buat sebelumnya, buka `route.guard.ts`

```ts
constructor(
    private readonly router: Router,
  ) { }

  canActivate(): boolean {
    return this.authorize();
  }

  canActivateChild(): boolean {
    return this.authorize();
  }

  private authorize(): boolean {

    const authorize: boolean = (sessionStorage.getItem('token') !== null);

    if (!authorize) {
      alert('Kamu tidak mempunyai akses di halaman ini');
      this.router.navigateByUrl('/auth/login');
    }

    return authorize;
  }
```

Aktifkan guard di `app-routing.module.ts`

```ts
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./resume/resume.module").then((module) => module.ResumeModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "demo",
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    loadChildren: () => import("./demo/demo.module").then((m) => m.DemoModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
];
```

## PART Todo

Buka `new-todo.service.ts` perbaharui semua kode menjadi seperti ini:

```ts
  constructor(
    private readonly http: HttpClient
  ) { }

  public getAll(): Observable<Todo[]> {
    const token: string = sessionStorage.getItem('token') as string;
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-type': 'Application/json; charset=utf-8'
    });
    return this.http.get<Todo[]>('/api/todos', { headers });

  }

  public getById(id: number): Observable<Todo> {
    const token: string = sessionStorage.getItem('token') as string;
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-type': 'Application/json; charset=utf-8'
    });
    return this.http.get<Todo>(`/api/todos/${id}`, { headers });
  }

  public save(todo: Todo): Observable<Todo> {
    const token: string = sessionStorage.getItem('token') as string;
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-type': 'Application/json; charset=utf-8'
    });
    if (todo.id) {
      return this.http.put<Todo>('/api/todos', todo, { headers })
    } else {
      return this.http.post<Todo>('/api/todos', todo, { headers })
    }
  }

  public delete(id: number): Observable<void> {
    const token: string = sessionStorage.getItem('token') as string;
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-type': 'Application/json; charset=utf-8'
    });
    return this.http.delete<void>(`/api/todos/${id}`, { headers });
  }
```

Ada sedikit modifikasi pada bagian `auth.component.ts`, tambahkan kode ini di `ngOnInit`

```ts
constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params: Params) => params.action))
      .subscribe((action) => {
        if (action === 'logout') {
          sessionStorage.removeItem('token')
          this.router.navigateByUrl('/auth/login');
        } else if (sessionStorage.getItem('token') && action === 'login') {
          this.router.navigateByUrl('/');
        }
      })
  }
```

Modifikasi juga pada `auth-routing.module.ts`

```ts
const routes: Routes = [
  {
    path: "login",
    component: AuthComponent,
  },
  {
    path: ":action",
    component: AuthComponent,
  },
];
```

Pada bagian `new-todo-list.component.ts` menjadi seperti ini

```ts
todos: Todo[] = [];
  loading: boolean = false;
  subcriber: Observer<any>;

  constructor(
    private readonly todoService: NewTodoService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.todoService.isListUpdated()
      .subscribe((updated: boolean) => {
        if (updated) {
          this.loadData()
        }
      })

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
```

Pada bagian `new-todo-form.component.ts` menjadi seperti ini

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
    this.todoService.save(todo)
      .subscribe(() => {
        this.router.navigateByUrl('/demo/new-todos');
        this.todoForm.reset()
      })
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
```

## PART Interceptor

> Interceptor adalah sebuah fungsi untuk mendeteksi http service yang di request kesebuah `backend`
> Angular menyediakan `CLI` untuk meng-generate `interceptor`
> Generate interceptor `ng generate interceptor shared/interceptors/request`

Buka `request.interceptor.ts`

```ts
constructor(
    private readonly router: Router
  ) { }

  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 || error.status === 403) {
      alert('Sesi anda sudah habis');
      this.router.navigateByUrl('/auth/logout')
    }
    return throwError(error);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(`Intercept ${request.method} request to ${request.url}`);
    const token: string = sessionStorage.getItem('token') as string;
    if (token) {
      const newRequest: any = request.clone();
      newRequest.headers = request.headers.set('Authorization', `Bearer ${token}`);
      return next.handle(newRequest).pipe(catchError(err => this.handleError(err)))
    } else {
      return next.handle(request).pipe(catchError(err => this.handleError(err)))
    }
  }
}

```

Uji coba jalankan.
