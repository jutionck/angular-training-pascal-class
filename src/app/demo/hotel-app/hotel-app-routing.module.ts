import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelAppComponent } from './hotel-app.component';

const routes: Routes = [{ path: '', component: HotelAppComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelAppRoutingModule { }
