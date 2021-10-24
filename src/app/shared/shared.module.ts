import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { HighlightDirective } from './directives/highlight.directive';
import { BsbuttonDirective } from './directives/bsbutton.directive';
import { MailtoPipe } from './pipes/mailto.pipe';

const components = [
  HeaderComponent,
  FooterComponent,
  ValidationMessageComponent];

const directives = [
  HighlightDirective, BsbuttonDirective
];

const pipes = [MailtoPipe]
@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...pipes
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...components,
    ...directives,
    ...pipes
  ]
})
export class SharedModule { }
