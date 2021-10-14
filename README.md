## Angular Routing

### TOPIC

> Angular routing di bagi menjadi 2 (dua) bagian `load` yang pertama adalah `eager load` dan `lazy load`
>
> Eager Loading: digunakan untuk memuat modul inti dan modul fitur yang diperlukan untuk memulai aplikasi
>
> Lazy Loading: semua modul lain dapat dimuat dengan malas sesuai permintaan setelah aplikasi dimulai.

### PART Eager Load

Open `app-routing.module.ts`

```ts
const routes: Routes = [
  {
    path: "",
    component: ResumeComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
];
```

### PART Lazy Load

> 1. Create `resume-routing.module.ts` in `resume`

Open `resume-routing.module.ts`

```ts
const routes: Routes = [
  {
    path: "",
    component: ResumeComponent, // eager load
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeRoutingModule {}
```

> 2. Import `ResumeRoutingModule` in `resume.module.ts`

Open `resume.module.ts`

```ts
imports: [
    CommonModule,
    ResumeRoutingModule
  ],
```

Modify `app-routing.module.ts`

```ts
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./resume/resume.module").then((module) => module.ResumeModule),
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
];
```

> 3. Create module `ng g m demo --routing`
> 4. Create component `ng g c demo`
> 5. Create component `ng g c demo/demo1`
> 6. Create component `ng g c demo/demo2`

Open `demo-routing.module.ts`

```ts
const routes: Routes = [
  {
    path: "",
    component: DemoComponent,
    children: [
      {
        path: "demo1",
        component: Demo1Component,
      },
      {
        path: "demo2",
        component: Demo2Component,
      },
    ],
  },
];
```

> Above example for `nested route`

Modify `app-routing.module.ts`

```ts
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./resume/resume.module").then((module) => module.ResumeModule),
  },
  {
    path: "demo",
    loadChildren: () =>
      import("./demo/demo.module").then((module) => module.DemoModule),
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
];
```

Modify `header.component.html` adding `routerLinkActive="active"`

```html
<a class="nav-link" aria-current="page" routerLinkActive="active" routerLink=""
  >Home</a
>
```

### PART Route Guard

> Create guard auth `ng g g auth/auth`
> Choose `CanActivate`
