import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TodoComponent, TodoListComponent, TodoFormComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }
