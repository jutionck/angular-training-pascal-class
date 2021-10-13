import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [
    ResumeComponent,
    SidebarComponent,
    ContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResumeComponent
  ]
})
export class ResumeModule { }
