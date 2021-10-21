import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelAppRoutingModule } from './hotel-app-routing.module';
import { HotelAppComponent } from './hotel-app.component';
import { HotelAppListComponent } from './components/hotel-app-list/hotel-app-list.component';
import { HotelAppFormComponent } from './components/hotel-app-form/hotel-app-form.component';


@NgModule({
  declarations: [HotelAppComponent, HotelAppListComponent, HotelAppFormComponent],
  imports: [
    CommonModule,
    HotelAppRoutingModule
  ]
})
export class HotelAppModule { }
