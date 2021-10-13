import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { SharedModule } from '../shared/shared.module';
import { ResumeRoutingModule } from './resume-routing.module';

@NgModule({
  declarations: [
    ResumeComponent,
    SidebarComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule
  ],
  exports: [
    ResumeComponent
  ]
})
export class ResumeModule { }
