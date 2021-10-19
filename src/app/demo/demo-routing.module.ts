import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoComponent } from './demo.component';

const routes: Routes = [{ path: '', component: DemoComponent }, { path: 'todos', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
