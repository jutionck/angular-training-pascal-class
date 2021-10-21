import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifecycleRoutingModule } from './lifecycle-routing.module';
import { LifecycleComponent } from './lifecycle.component';
import { ChildComponent } from './components/child/child.component';
import { ParentComponent } from './components/parent/parent.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LifecycleComponent, ChildComponent, ParentComponent],
  imports: [
    CommonModule,
    LifecycleRoutingModule,
    FormsModule
  ]
})
export class LifecycleModule { }
