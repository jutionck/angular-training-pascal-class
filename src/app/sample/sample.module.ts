import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighligtCardComponent } from './highligt-card/highligt-card.component';
import { ResourcesComponent } from './resources/resources.component';
import { NextStepsComponent } from './next-steps/next-steps.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LinksComponent } from './links/links.component';
import { SampleComponent } from './sample.component';

@NgModule({
  declarations: [
    HighligtCardComponent,
    ResourcesComponent,
    NextStepsComponent,
    FooterComponent,
    HeaderComponent,
    LinksComponent,
    SampleComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SampleComponent
  ]
})
export class SampleModule { }
