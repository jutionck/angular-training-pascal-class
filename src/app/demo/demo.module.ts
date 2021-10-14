import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { ShopaComponent } from './shopa/shopa.component';
import { TodoComponent } from './todo/todo.component';


@NgModule({
  declarations: [DemoComponent, ShopaComponent, TodoComponent],
  imports: [
    CommonModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }
