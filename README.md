# Angular Lifecycle Hooks

## Pencapaian

```text
Memahami siklus atau tahapan proses yang terjadi di dalam Angular mulai dari awal hingga proses tersebut berakhir.
```

## Indikator

```text
1. Memahami cara menggunakan ngOnChanges
2. Memahami cara menggunakan ngOnInit
3. Memahami cara menggunakan ngDoCheck
4. Memahami cara menggunakan ngAfterContentInit
5. Memahami cara menggunakan ngAfterContentChecked
6. Memahami cara menggunakan ngAfterViewInit
7. Memahami cara menggunakan ngAfterViewChecked
8. Memahami cara menggunakan ngOnDestroy
```

## PART Module and Component

> 1. Buat module baru dengan nama `lifecycle`. Bisa dengan CLI `ng g m demo/lifecycle --route lifecycle --module demo.module`
> 2. Buat component `parent` dengan cara `ng g c demo/lifecycle/components/parent`
> 3. Buat component `child` dengan cara `ng g c demo/lifecycle/components/child`
> 4. Buat method `printLog` di file `environment.ts`

Buka `environmnet.ts`

```ts
export const printLog = (message: string) => {
  console.log(`This ${message} is called!`);
};
```

## `ngOnInit` and `constructor`

`OnInit` adalah sebuah lifecycle hook yang di panggil setelah angular inisialisasi sebuah directive `component`

Untuk menginisialisasi `ngOnInit` kita bisa menggunakan `implement` pada class component

Open `parent.component.ts`

```ts
export class ParentComponent implements OnInit {
  constructor() {
    printLog("constructor()");
  }

  ngOnInit(): void {
    printLog("ngOnInit()");
  }
}
```

Open `child.component.ts`

```ts
export class ChildComponent implements OnInit {
  @Input() bootcampName: string = "";
  title: string = "Child Component";

  constructor() {
    printLog(`${this.title} constructor()`);
  }

  ngOnInit(): void {
    printLog(`${this.title} ngOnInit()`);
  }
}
```

Open `parent.component.html`

```html
<div class="row p-3 m-3">
  <div class="col">
    <h4>{{ title }}</h4>

    <button class="btn btn-outline-primary mb-3" (click)="toggleChild()">
      Toggle Child Component
    </button>

    <app-child *ngIf="isChild" [bootcampName]="bootcampName"></app-child>
  </div>
</div>
```

Open `child.component.html`

```ts
<h4>{{ title }}</h4>
```

```text
Silahkan uji coba di browser.
```

## `ngOnChanges`

> Jangan lupa import `FormsModule` di `lifecycle.module`

Buka kembali `child.component.ts` kemudian `implement OnChanges`

```ts
ngOnChanges(changes: SimpleChanges): void {
    printLog(`${this.title} ngOnChanges()`);
    console.log(changes);
  }
```

Buka kembali `parent.component.html`

```html
<ng-container *ngIf="isChild">
  <input type="text" [(ngModel)]="bootcampName" class="form-control" />
  <app-child [bootcampName]="bootcampName"></app-child>
</ng-container>
```

Buka kembali `child.component.html`

```html
<h4 class="mt-3">{{ title }}</h4>

<p>{{ bootcampName }}</p>
```

## `ngDoCheck`

```text
DoCheck adalah metode panggilan balik yang melakukan deteksi perubahan, dipanggil setelah detektor perubahan default berjalan.

Jadi sebenernya DoCheck ini berjalan bersamaan ketika ada OnInit dan OnChanges
```

Buka `parent.component.ts` implementasi `DoCheck`

```ts
 ngDoCheck(): void {
    printLog(`${this.title} ngDoCheck()`);
  }
```

Buka `child.component.ts` implementasi `DoCheck`

```ts
ngDoCheck(): void {
    printLog(`${this.title} ngDoCheck()`);
  }
```

```text
Silahkan uji coba di browser. Lihat hirarki di panggil nya lifecycle hooks

This Parent Component constructor() is called!
environment.ts:17 This Parent Component ngOnInit() is called!
environment.ts:17 This Parent Component ngDoCheck() is called!
environment.ts:17 This Parent Component ngDoCheck() is called!

Lalu klik tombol Toggle Child Component:

This Parent Component ngDoCheck() is called! (2x)
environment.ts:17 This Child Component constructor() is called!
environment.ts:17 This Child Component ngOnChanges() is called!
child.component.ts:24 {bootcampName: SimpleChange}
environment.ts:17 This Child Component ngOnInit() is called!
environment.ts:17 This Child Component ngDoCheck() is called!
environment.ts:17 This Parent Component ngDoCheck() is called!
environment.ts:17 This Child Component ngDoCheck() is called!

Lalu coba ketik 1 huruf di input:
This Parent Component ngDoCheck() is called!
environment.ts:17 This Child Component ngOnChanges() is called!
child.component.ts:24 {bootcampName: SimpleChange}
environment.ts:17 This Child Component ngDoCheck() is called!
```

## `ngOnDestroy`

Buka `child.component.ts` implementasi `OnDestroy`

```ts
ngOnDestroy(): void {
    printLog(`${this.title} ngOnDestroy()`);
  }
```

```text
Buka di browser

This Child Component ngOnDestroy() is called!
```

> Praktik lebih jauh tentang `OnDestroy`

Buka kembali `child.component.ts`

```ts
counter: number = 0;
interval: any;
```

> Tambahkan ini di `OnInit`

```ts
//  Demo onDestroy
this.interval = setInterval(() => {
  this.counter = this.counter + 1;
  console.log(this.counter);
}, 3000);
```

```text
Uji coba di browser

Lakukan klik Toggle Child Component lihat apa yang terjadi, OnDestroy terpanggil tetapi counter terus berjalan
```

> Tambahkan baris ini pada `OnDestroy`

```ts
ngOnDestroy(): void {
    clearInterval(this.interval);
    printLog(`${this.title} ngOnDestroy()`);
  }
```

### Hooks for children components

## AfterContentInit && AfterContentChecked

> Ketika ada properti `<ng-content></ng-content>` maka konten di dalam nya akan tampil dan tiap ada perubahan pasti akan memanggil `AfterContentChecked`
>
> `AfterContentInit` hanya terpanggil satu kali saat component itu di panggil setelah `ngDoCheck()`
>
> `AfterContentChecked` akan terpanggil setelah `ngAfterContentInit` tetapi akan terus terpanggil setelah nya ketika `ngDoCheck()` di panggil

Buka `child.component.ts` implementasi `AfterContentInit, AfterContentChecked`

```ts
ngAfterContentInit(): void {
    printLog(`${this.title} ngAfterContentInit()`);
  }

  ngAfterContentChecked(): void {
    printLog(`${this.title} ngAfterContentChecked()`);
  }
```

Buka `parent.component.html`

```html
<app-child [bootcampName]="bootcampName">
  This <b>content</b> is injected from parent
</app-child>
```

```text
Jalankan terlebih dahulu lihat apa yang terjadi jika tidak menggunakan <ng-content></ng-content> pada child.component.ts
```

Buka `child.component.html`

```html
<ng-content></ng-content>
```

```text
Lihat perbedaan nya.
```

## AfterViewInit && AfterViewChecked

> `AfterViewInit` merespon setiap component itu di jalankan baik parent maupun semua child turunnya
>
> Terpanggil hanya 1x setelah `ngAfterContentChecked`
>
> `AfterViewChecked` setelah component di inisialisasi maka lifecylce ini terpanggil tetapi setelah `ngAfterViewInit`
>
> Akan terus terpanggil ketika ada `ngAfterContentChecked`

Buka `child.component.ts` implementasi `AfterViewInit, AfterViewChecked`

```ts
ngAfterViewInit(): void {
    printLog(`${this.title} ngAfterViewInit()`);
  }

  ngAfterViewChecked(): void {
    printLog(`${this.title} ngAfterViewChecked()`);
  }
```

```text
Jalankan di browser
```

## The Order of Execution of Life Cycle Hooks

### The Angular executes the hooks in the following order

### On Component Creation

1. OnChanges
2. OnInit
3. DoCheck
4. AfterContentInit
5. AfterContentChecked
6. AfterViewInit
7. AfterViewChecked

### When the Component with Child Component is created

1. OnChanges
2. OnInit
3. DoCheck
4. AfterContentInit
5. AfterContentChecked
   1. Child Component -> OnChanges
   2. Child Component -> OnInit
   3. Child Component -> DoCheck
   4. Child Component -> AfterContentInit
   5. Child Component -> AfterContentChecked
   6. Child Component -> AfterViewInit
   7. Child Component -> AfterViewChecked
6. AfterViewInit
7. AfterViewChecked
