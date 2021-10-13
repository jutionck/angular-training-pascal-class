import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./resume/resume.module')
      .then(module => module.ResumeModule)
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module')
      .then(module => module.DemoModule)
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

// eager load 
// lazy load

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
