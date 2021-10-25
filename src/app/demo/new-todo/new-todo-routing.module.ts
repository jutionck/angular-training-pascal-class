import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTodoComponent } from './new-todo.component';

const routes: Routes = [
  {
    path: '', component: NewTodoComponent
  },
  {
    path: ':id', component: NewTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewTodoRoutingModule { }
