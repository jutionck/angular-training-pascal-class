import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./resume/resume.module')
      .then(module => module.ResumeModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule)
  },
  { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
