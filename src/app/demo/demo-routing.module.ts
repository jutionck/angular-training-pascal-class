import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoComponent } from './demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent
  },
  {
    path: 'todos',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: 'hotels',
    loadChildren: () => import('./hotel-app/hotel-app.module').then(m => m.HotelAppModule)
  },
  {
    path: 'lifecycle',
    loadChildren: () => import('./lifecycle/lifecycle.module').then(m => m.LifecycleModule)
  },
  {
    path: 'new-todos',
    loadChildren: () => import('./new-todo/new-todo.module').then(m => m.NewTodoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
