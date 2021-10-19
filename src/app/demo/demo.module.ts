import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { ShopaComponent } from './components/shopa/shopa.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DemoComponent,
    ShopaComponent,
    TodoComponent,
    TodoListComponent,
    TodoFormComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DemoModule { }
