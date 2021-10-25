import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewTodoRoutingModule } from './new-todo-routing.module';
import { NewTodoComponent } from './new-todo.component';
import { NewTodoListComponent } from './components/new-todo-list/new-todo-list.component';
import { NewTodoFormComponent } from './components/new-todo-form/new-todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewTodoService } from './services/new-todo.service';


@NgModule({
  declarations: [
    NewTodoComponent,
    NewTodoListComponent,
    NewTodoFormComponent],
  imports: [
    CommonModule,
    NewTodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ], providers: [
    NewTodoService
  ]
})
export class NewTodoModule { }
