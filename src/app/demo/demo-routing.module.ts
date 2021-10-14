import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from '../shared/guard/route.guard';
import { DemoComponent } from './demo.component';
import { ShopaComponent } from './shopa/shopa.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    canActivate: [RouteGuard],
    canActivateChild: [RouteGuard],
    children: [
      {
        path: 'shopa',
        component: ShopaComponent
      },
      {
        path: 'todo',
        component: TodoComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
